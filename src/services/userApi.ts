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
    throw new Error(error.message);
  }

  return await getCurrentUser(); // Fetch complete profile
}

export async function getCurrentUser(): Promise<UserData | null> {
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) return null;

  const user = authData.user;

  // Fetch from public.users table for extended data (phone, address, etc.)
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.warn("User profile record not found or inaccessible:", profileError.message);
    // Return base data from auth metadata as fallback
    return {
      id: user.id,
      email: user.email || "",
      firstName: user.user_metadata?.firstName || "Guest",
      lastName: user.user_metadata?.lastName || "",
      avatarUrl: user.user_metadata?.avatarUrl || "",
      phone: user.user_metadata?.phone || "",
      address: user.user_metadata?.address || "",
      city: user.user_metadata?.city || "",
      zip: user.user_metadata?.zip || "",
      country: user.user_metadata?.country || "",
    };
  }

  return {
    id: user.id,
    email: user.email || "",
    ...profile,
  };
}

export async function updateUser(userData: Partial<UserData>) {
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData?.session?.user?.id;

  if (!userId) throw new Error("User must be logged in to update profile");

  const { error } = await supabase
    .from("users")
    .update(userData)
    .eq("id", userId);

  if (error) {
    console.error("Error updating user:", error);
    throw new Error("Could not update user profile");
  }
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

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/update-password`,
  });

  if (error) {
    console.error("Reset password error:", error);
    throw new Error(error.message);
  }
}

export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error("Update password error:", error);
    throw new Error(error.message);
  }
}
