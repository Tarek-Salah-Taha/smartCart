import { LoginParams, SignUpParams, UserData } from "../types/types";
import supabase from "./supabase";

export async function signUp({
  firstName,
  lastName,
  avatarUrl,
  email,
  password,
}: SignUpParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName,
        lastName,
        avatarUrl,
      },
    },
  });

  if (error) {
    console.error("Signup error:", error);
    throw new Error(error.message || "Signup failed");
  }

  if (!data.user) {
    throw new Error("No user returned after signup!");
  }

  //? Insert user data into 'users' table only if signup succeeded
  const { error: insertError } = await supabase.from("users").upsert([
    {
      id: data.user.id, // Ensure user ID is passed to the users table
      email,
      firstName,
      lastName,
      avatarUrl,
    },
  ]);

  if (insertError) {
    console.error("Insert error:", insertError);
    throw new Error(insertError.message || "Failed to insert user data");
  }

  //? Return user data
  return await getCurrentUser(); // Fetch complete profile
}

export async function login({ email, password }: LoginParams) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error);
    throw new Error("Email or password are incorrect");
  }

  return await getCurrentUser(); // Fetch complete profile
}

export async function getCurrentUser() {
  // 1. Get session
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError || !sessionData?.session) {
    console.error("Session error:", sessionError);
    return null; // Not logged in
  }

  const id = sessionData.session.user.id;

  const { data: userProfile, error: profileError } = await supabase
    .from("users")
    .select("firstName, lastName, avatarUrl")
    .eq("id", id)
    .single();

  if (profileError) {
    console.error("User profile error:", profileError);
    throw new Error("Could not fetch user profile.");
  }

  return {
    id,
    email: sessionData.session.user.email || "",
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    avatarUrl: userProfile.avatarUrl,
  };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
    throw new Error("Error logging out");
  }
}

export async function uploadAvatar(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error);
    throw new Error("Failed to upload avatar");
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

  return data.publicUrl;
}

export async function fetchUser(): Promise<UserData | null> {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) return null;

  const userData: UserData = {
    id: data.user.id,
    firstName: data.user.user_metadata?.firstName || "Guest",
    avatarUrl: data.user.user_metadata?.avatarUrl || "",
  };

  return userData;
}
