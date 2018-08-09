function createVideoModel(identifier, fullEpisode) {
  var id = parseInt(identifier, 10)
  return {
    id: id,
    url: ('/v/' + id + '/'),
    thumbnail: 'http://s.glbimg.com/jo/g1/f/original/2015/02/10/macanb13.jpg',
    thumbnail_hd: 'http://thumb-hd.jpg',
    title: 'Video Title ' + identifier,
    description: 'Video Description ' + identifier,
    kind: fullEpisode ? 'episode' : 'excerpt',
    duration: 113814,
    program: {
      id: 123,
      title: 'Program Title 123'
    }
  }
}

function createVideoModelArray(length, fullEpisode) {
  var videos = []

  for (var i = 0; i < length; i++) {
    videos.push(createVideoModel(i))
  }

  return videos
}

module.exports = {
  createVideoModel: createVideoModel,
  createVideoModelArray: createVideoModelArray
}
