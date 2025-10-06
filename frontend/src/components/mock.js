// Mock data for Sammy Sparkle website

export const mockData = {
  hero: {
    headline: "How I Gained 150,000 Followers on TikTok — and Found Myself in the Process.",
    subheadline: "A step-by-step playbook to grow your TikTok with heart, purpose, and sparkle.",
    ctaText: "Download the 150K Playbook →"
  },
  
  story: {
    text: "Two years ago, I was posting daily to 200 views. I felt invisible. Then I stopped chasing the algorithm and started showing up as myself — and that changed everything. I grew to 150,000 followers by turning authenticity into strategy. Now, I'm sharing everything I learned."
  },
  
  ebook: {
    title: "The TikTok 150K Playbook",
    tagline: "The proven path to grow, glow, and connect online.",
    price: "$29 AUD",
    contents: [
      "My exact posting rhythm and daily routine",
      "Viral hook formulas that work in 2025", 
      "How to balance emotion + strategy",
      "The mindset shift behind consistent virality"
    ],
    ctaText: "Get Your Copy ($29 AUD) →"
  },
  
  testimonials: [
    {
      id: 1,
      text: "I followed Sammy's strategy and hit 10K followers in a month.",
      author: "Jessica M."
    },
    {
      id: 2, 
      text: "Her eBook gave me the confidence to show up as me again.",
      author: "Sarah K."
    },
    {
      id: 3,
      text: "The viral hook formulas actually work! My views doubled in a week.",
      author: "Emma R."
    }
  ],
  
  leadMagnet: {
    title: "Grab my Free Viral Hook Checklist!",
    subtitle: "The 10 hooks that took my videos from 500 views → 500,000.",
    ctaText: "Get the Free Checklist →"
  },
  
  footer: {
    signature: "Keep shining, and never dim your sparkle — Sammy ✨",
    socialLinks: [
      { platform: "TikTok", handle: "@sammysparkle" },
      { platform: "Instagram", handle: "@sammysparkle" },
      { platform: "YouTube", handle: "Sammy Sparkle" }
    ]
  }
};

// Mock API functions
export const mockAPI = {
  subscribeEmail: async (email) => {
    console.log('Mock email subscription:', email);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'Successfully subscribed!' };
  },
  
  purchaseEbook: async (customerData) => {
    console.log('Mock eBook purchase:', customerData);
    // Simulate API delay  
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { 
      success: true, 
      message: 'Purchase successful! Check your email for download link.',
      transactionId: 'TXN_' + Math.random().toString(36).substr(2, 9)
    };
  }
};