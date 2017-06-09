ActiveRecord::Base.transaction do
User.create!([
  {name: "Cole Turner", email: "turner.cole@gmail.com", password: "testing", byline: "Web Developer", headline: nil}
])
Article.create!([
  {title: "Cool Knives 101", byline: "We walk you through the sharpest guide of EDC Knives", summary: "This is a summary", slug: nil, text: "Full article goes here", user_id: 1}
])
Category.create!([
  {slug: "headphones", title: "Headphones", image_data: nil},
  {slug: "knives", title: "Knives", image_data: nil},
  {slug: "gadgets", title: "Gadgets", image_data: nil},
  {slug: "keychains", title: "Keychains", image_data: nil},
  {slug: "bags", title: "Bags", image_data: nil},
  {slug: "watches", title: "Watches", image_data: nil},
  {slug: "pens", title: "Pens", image_data: nil},
  {slug: "notebooks", title: "Notebooks", image_data: nil},
  {slug: "flashlights", title: "Flashlights", image_data: nil},
  {slug: "wallets", title: "Wallets", image_data: nil},
  {slug: "multitools", title: "Multitools", image_data: nil},
  {slug: "audio", title: "Audio", image_data: nil}
])
Feed.create!([
  {slug: "all", format: "flat"}
])
Brand.create!([
  {title: "Apple", social: nil}
])
Shop.create!([
  {is_featured: true, title: "Apple Store", url: "http://www.apple.com/", social: nil}
])
Product.create!([
  {title: "Everyday Shorts", summary: "LIGHTWEIGHT ENOUGH FOR WORKOUTS, DURABLE ENOUGH FOR THE OUTDOORS, STYLISH ENOUGH TO WEAR WITH A BUTTON-DOWN.", text: "One short for every activity, whether in the gym, on the trail, running laps, or running errands. Made with hardwearing double-weave nylon, plenty of four-way stretch, water-repellent finish, and deep pockets that keep valuables in place when on the =s the most versatile athletic short you've ever owned.", brand_id: nil, score: nil, slug: "everyday-shorts", category_id: nil},
  {title: "Apple AirPods", summary: "Bluetooth earphones made by Apple", text: "After a simple one-tap setup, AirPods are automatically on and always connected.1 Using them is just as easy. They can sense when =re in your ears and pause when you take them out. And the AirPods experience is just as amazing whether =re listening to your iPhone, Apple Watch, iPad, or Mac.", brand_id: 1, score: 100, slug: "apple-airpods", category_id: 1}
])
Tag.create!([
  {name: "knives", parent_id: nil, display_name: "Knives", description: "If you've seen photos of what people carry every day, you might be why do so many people carry a pocketThe answer is different for everyone, but it all comes back to the idea that a handy pocket knife is an indispensable tool. knife?wondering, \n\n    People use their EDC knife everywhere, whether they're at work (say, opening a package) or at home (making a quick repair around the house). Having a knife can also potentially save your life in an emergency (cutting a seatbelt) or in a survival situation if you spend time outdoors.\n\n    That said, knives may be restricted depending on where you live and what your local laws are, so be aware of those before deciding what kind of pocket knife you can carry."}
])
ProductLink.create!([
  {url: "https://mylesapparel.com/collections/shorts/products/the-everyday-short-charcoal", is_featured: true, product_id: 2, shop_id: nil, is_sponsored: nil},
  {url: "http://www.apple.com/airpods/", is_featured: true, product_id: 1, shop_id: 1, is_sponsored: true}
])
Review.create!([
  {product_id: 2, user_id: 1, rating: 5, text: "I love these shorts I wear them everyday"},
  {product_id: 2, user_id: 1, rating: 4, text: "Did I mention I wear them _every_ day?"},
  {product_id: 2, user_id: 1, rating: 1, text: "Adding a new review!"},
  {product_id: 2, user_id: 1, rating: 3, text: "Testing values"},
  {product_id: 2, user_id: 1, rating: 3, text: "Testing values"},
  {product_id: 2, user_id: 1, rating: 3, text: "Testing values"},
  {product_id: 2, user_id: 1, rating: 3, text: "Testing values"},
  {product_id: 2, user_id: 1, rating: 3, text: "Testing values"}
])
ReactionGroup.create!([
  {object_type: "Review", object_id: 1, value: "helpful", reactions_count: 1}
])
Reaction.create!([
  {reaction_group_id: 1, user_id: 1}
])
TagLink.create!([
  {tag_id: 1, taggable_type: "Article", taggable_id: 1}
])

end
