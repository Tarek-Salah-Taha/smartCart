import emailjs from '@emailjs/browser';

interface OrderDetails {
    orderId: string;
    customerName: string;
    customerEmail: string;
    items: {
        title: string;
        quantity: number;
        price: number;
        image: string;
    }[];
    total: number;
    shipping: number;
    tax: number;
}

export const sendOrderConfirmation = async (details: OrderDetails) => {
    // Replace these with your actual EmailJS credentials
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    const templateParams = {
        to_name: details.customerName,
        email: details.customerEmail, // Changed from to_email to match template {{email}}
        order_id: details.orderId,
        orders: details.items.map(item => ({
            name: item.title,
            units: item.quantity,
            price: item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), // Format price
            image_url: item.image
        })),
        cost: {
            shipping: details.shipping.toFixed(2),
            tax: details.tax.toFixed(2),
            total: details.total.toFixed(2)
        }
    };

    try {
        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
        console.log('SUCCESS!', response.status, response.text);
        return { success: true };
    } catch (error) {
        console.error('FAILED...', error);
        return { success: false, error };
    }
};
