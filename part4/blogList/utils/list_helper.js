const dummy = (blog) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
    
}

const favoriteBolg = (blogs) => {
    let thefavorite = {
        _id: "00000",
        title: "example",
        author: "example",
        url: "someurl",
        likes: 0,
        __v: 0
      }

    for (let blog of blogs){
        if (thefavorite.likes <= blog.likes){
            thefavorite = blog
        }
    }

    return {
        title: thefavorite.title,
        author: thefavorite.author,
        likes: thefavorite.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBolg
}

//4.14 asti tehty