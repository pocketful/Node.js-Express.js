// const posts = [1, 2, 3];

// function log(el) {
//     const elObj = { el };
//     const key = Object.keys(elObj);
//     // console.log(key);
//     console.log(`${key[0]} ===`, el);
// }
// // log(posts); 

// get post by id (fetch all)
function getById(arr, postId) {
    const postbyId = arr.find(elObj => elObj.id === postId);
    return postbyId ? postbyId : false;
    // return postbyId === undefined ? false : postbyId;
}

// exports
module.exports = {
    getById,
};
