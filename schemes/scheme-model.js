const db = require("../data/db.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
//   addStep,
  update,
  remove
};

function find() {
  return db("schemes");
}

function findById(id) {
    return db("schemes").where({ id }).first();
}

function findSteps(id) {
    return db("steps")
    .where("scheme_id", id)
    .join("schemes", "steps.scheme_id", "=", "schemes.id")
    .select("steps.id", "schemes.scheme_name", "steps.step_number", "steps.instructions")
    .orderBy("steps.step_number");

} // I should write a findStepById function which finds a specific step for a specific scheme.

// -   `findSteps(id)`:
//     -   Expects a scheme `id`.
//     -   Resolves to an array of all correctly ordered step for the given scheme: `[ { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}, { id: 18, scheme_name: 'Find the Holy Grail', step_number: 2, instructions: '...and quest'}, etc. ]`.
//     -   This array should include the `scheme_name` _not_ the `scheme_id`.

function add(scheme) {
    return db("schemes")
    .insert(scheme, "id")
    .then(ids => {
        return findById(ids[0]);
    });
}

function update (changes, id) {
    return db("schemes")
        .where({ id })
        .update(changes)
        .then(() => {
            return findById(id)
        })
}

// function addStep(step, id) {
//     return findSteps({ id })
//     .where("steps.scheme_id", id)
//     .insert(step, "scheme_id");
//   }

function remove(id) {
    return db("schemes")
        .where({ id }).del();
}