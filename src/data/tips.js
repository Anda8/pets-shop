import { v4 as uuidv4 } from "uuid";
export const CATEGORIES = {
  DOG: "Dog",
  CAT: "Cat",
  HEALTH: "Health",
  TRAINING: "Training"
};

export const tips = [
    {
      id: uuidv4(),
      category: "Dog",
      img: "/images/tips/dog1.png",
      title: "Choosing the Right Food for Your Pet",
      details:
        "Learn how to select the best diet for your pet's age, breed, and health needs.",
    },
    {
      id: uuidv4(),
      category: "Training",
      img: "/images/tips/dog2.png",
      title: "Basic Training Commands for Dogs",
      details: "Get started with essential commands like sit, stay, and come.",
    },
    {
      id: uuidv4(),
      category: "Cat",
      img: "/images/tips/cat1.png",
      title: "Keeping Your Cat Healthy and Happy",
      details:
        "Tips for maintaining your cat's physical and mental well-being.",
    },
    {
      id: uuidv4(),
      category: "Dog",
      img: "/images/tips/dog3.png",
      title: "Choosing the Right Dog Food",
      details:
        "Learn how to select the best nutrition for your dog's age and breed.",
    },
    {
      id: uuidv4(),
      category: "Dog",
      img: "/images/tips/dog4.png",
      title: "Grooming Your Dog at Home",
      details:
        "Step-by-step guide to grooming your dog, including bathing, brushing, and nail trimming.",
    },
    {
      id: uuidv4(),
      category: "Dog",
      img: "/images/tips/dog5.png",
      title: "Understanding Dog Behavior",
      details:
        "Decipher your dog's body language and vocalizations to better understand their needs.",
    },
    {
      id: uuidv4(),
      category: "Dog",
      img: "/images/tips/dog6.png",
      title: "Exercise Tips for Different Breeds",
      details:
        "Tailored exercise routines for various dog breeds to keep them fit and happy.",
    },
  ];