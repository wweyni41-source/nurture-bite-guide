export interface GuideData {
  title: string;
  introduction: string;
  focusAreas: string[];
  feedingStructure: {
    title: string;
    items: { label: string; description: string; iconKey: 'calendar' | 'utensils' | 'droplets' | 'shield' | 'clock' | 'apple' }[];
  };
  foodTypes: {
    category: string;
    items: string[];
  }[];
  heroImage: string;
}

export const guides: Record<string, GuideData> = {
  '6-8-months': {
    title: 'Feeding & Development Guide (6–8 Months)',
    heroImage: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=1200',
    introduction: 'This stage marks the beginning of solid food introduction. Babies are learning new textures, tastes, and feeding skills while still relying on breast milk or formula.',
    focusAreas: [
      'Introducing solid foods safely',
      'Developing swallowing skills',
      'Building routine feeding times',
      'Observing allergy reactions',
      'Supporting healthy growth'
    ],
    feedingStructure: {
      title: 'Feeding Structure',
      items: [
        { 
          label: 'Daily meal frequency', 
          description: '1 to 2 small meals a day in addition to regular milk feedings.',
          iconKey: 'calendar'
        },
        { 
          label: 'Texture progression', 
          description: 'Start with smooth purees, moving gradually to thicker, slightly lumpy textures.',
          iconKey: 'utensils'
        },
        { 
          label: 'Hydration guidance', 
          description: 'Primary hydration comes from breast milk or formula. Tiny sips of water can be introduced.',
          iconKey: 'droplets'
        },
        { 
          label: 'Safety recommendations', 
          description: 'Feed in an upright position. Never leave a baby alone while eating.',
          iconKey: 'shield'
        }
      ]
    },
    foodTypes: [
      {
        category: 'Fruits',
        items: ['Mashed Banana', 'Apple Puree (Steamed)', 'Pear Puree', 'Avocado Mash']
      },
      {
        category: 'Vegetables',
        items: ['Sweet Potato Mash', 'Steamed Carrot Puree', 'Pea Puree', 'Butternut Squash']
      },
      {
        category: 'Grains',
        items: ['Iron-fortified Rice Cereal', 'Oatmeal Cereal', 'Mashed Quinoa (very soft)']
      }
    ]
  },
  '9-12-months': {
    title: 'Feeding & Growth Guide (9–12 Months)',
    heroImage: 'https://images.unsplash.com/photo-1544126592-807daf21565c?auto=format&fit=crop&q=80&w=1200',
    introduction: 'At this stage, babies begin exploring more independence with eating and trying varied textures.',
    focusAreas: [
      'Self-feeding practice',
      'Expanding taste acceptance',
      'Balanced nutrition structure',
      'Meal routine building'
    ],
    feedingStructure: {
      title: 'Feeding Framework',
      items: [
        { 
          label: 'Daily meal plan structure', 
          description: '3 meals and 1-2 snacks per day, plus milk feedings.',
          iconKey: 'calendar'
        },
        { 
          label: 'Snack guidance', 
          description: 'Keep snacks healthy – small pieces of soft fruit or yogurt.',
          iconKey: 'apple'
        },
        { 
          label: 'Texture adjustments', 
          description: 'Move to finely chopped finger foods and soft-cooked chunks.',
          iconKey: 'utensils'
        },
        { 
          label: 'Portion awareness', 
          description: 'Let the baby decide when they are full. Do not force-feed.',
          iconKey: 'clock'
        }
      ]
    },
    foodTypes: [
      {
        category: 'Proteins',
        items: ['Scrambled Eggs (fully cooked)', 'Finely chopped Chicken', 'Flaked White Fish', 'Mashed Beans']
      },
      {
        category: 'Finger Foods',
        items: ['Soft Pasta Spirals', 'Cheese Cubes (very small)', 'Ripe Mango Pieces', 'Steamed Broccoli Florets']
      },
      {
        category: 'Dairy',
        items: ['Full-fat Greek Yogurt', 'Cottage Cheese', 'Mild Cheddar Strips']
      }
    ]
  },
  '12-18-months': {
    title: 'Toddler Nutrition Guide (12–18 Months)',
    heroImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200',
    introduction: 'Your child transitions closer to family meals and becomes more active physically.',
    focusAreas: [
      'Balanced meal structure',
      'Healthy habit formation',
      'Drinking routine',
      'Encouraging variety',
      'Managing appetite changes'
    ],
    feedingStructure: {
      title: 'Daily Structure',
      items: [
        { 
          label: 'Meal frequency', 
          description: 'Solidly 3 meals a day with the family.',
          iconKey: 'calendar'
        },
        { 
          label: 'Snack timing', 
          description: 'Mid-morning and mid-afternoon healthy fuel.',
          iconKey: 'clock'
        },
        { 
          label: 'Hydration plan', 
          description: 'Transitioning to whole cow milk (or fortified plant-based milk) and plenty of water.',
          iconKey: 'droplets'
        },
        { 
          label: 'Routine consistency', 
          description: 'Regular meal times help with behavior and appetite.',
          iconKey: 'shield'
        }
      ]
    },
    foodTypes: [
      {
        category: 'Family Style',
        items: ['Mini Turkey Meatballs', 'Vegetable Risotto', 'Whole Wheat Pancakes', 'Soft Beef Stew Pieces']
      },
      {
        category: 'Grains & Fiber',
        items: ['Brown Rice', 'Whole Grain Toast', 'Cooked Barley', 'Sweet Potato Wedges']
      },
      {
        category: 'Fresh Picks',
        items: ['Blueberries (halved)', 'Cucumber Sticks (peeled)', 'Kiwi Slices', 'Grated Carrots']
      }
    ]
  },
  '18-24-months': {
    title: 'Active Toddler Feeding Guide (18–24 Months)',
    heroImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1200',
    introduction: 'Toddlers become more independent and may show selective eating behaviors.',
    focusAreas: [
      'Balanced plate concept',
      'Routine discipline',
      'Managing picky eating',
      'Supporting energy needs',
      'Encouraging self-feeding'
    ],
    feedingStructure: {
      title: 'Structured Guidance',
      items: [
        { 
          label: 'Meal planning outline', 
          description: 'Involve the toddler in picking between two healthy options.',
          iconKey: 'calendar'
        },
        { 
          label: 'Portion structure', 
          description: 'Small portions. They can always ask for more.',
          iconKey: 'utensils'
        },
        { 
          label: 'Healthy boundaries', 
          description: 'The parent provides, the child decides how much to eat.',
          iconKey: 'shield'
        },
        { 
          label: 'Snack management', 
          description: 'Avoid grazing; keep snacks at designated times.',
          iconKey: 'clock'
        }
      ]
    },
    foodTypes: [
      {
        category: 'Power Snacks',
        items: ['Hummus with Pita', 'Nut Butter on Apple Slices', 'Hard-Boiled Eggs', 'Cheese Quesadillas']
      },
      {
        category: 'Main Meals',
        items: ['Chicken & Veggie Stir-fry', 'Lentil Soup', 'Fish Cakes', 'Pasta with Spinach Pesto']
      },
      {
        category: 'Treats (Healthy)',
        items: ['Homemade Fruit Popsicles', 'Yogurt Bark with Berries', 'Banana Bread (low sugar)']
      }
    ]
  }
};