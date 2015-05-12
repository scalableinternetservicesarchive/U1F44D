# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

1.upto(5) do |j|
  i = Image.new #({score: (-10 + rand(20)), location_lat: 34.0722,  location_long: -118.4441, author: "test_user_#{j}"})
  i.score = (-10 + rand(20))
  i.location_lat = 34.0722
  i.location_long = -118.4441
  i.author = "test_user_#{j}"
  i.img = File.open("test/archive/image_#{j}.jpg")
  i.save!
end
