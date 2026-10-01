require('dns').setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Jane Doe",
    age: 25,
    favoriteFoods: ["pochero", "sinigang"]
  });

  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, peopleFound) => {
    if (err) return done(err);
    done(null, peopleFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, personFound) => {
    if (err) return done(err);
    done(null, personFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound) => {
    if (err) return done(err);
    done(null, personFound);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return done(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = function(personName, done) {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    function(err, data) {
      if (err) return done(err);
      done(null, data);
    }
  );
};

const removeById = function(personId, done) {
  Person.findByIdAndRemove(personId, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const removeManyPeople = function(done) {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const queryChain = function(done) {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec(function(err, data) {
      if (err) return done(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
