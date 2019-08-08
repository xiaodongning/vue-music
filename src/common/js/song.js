
export default class Song {
  constructor({ id, singer, name, album, image, aliasName }) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.aliasName = aliasName
    this.image = image
  }
}

function singerName(arr) {
  let name = []
  name = arr.map((item) => {
    return item.name
  })
  return name.join('/')
}

export function createSong(music) {
  return new Song({
    id: music.id,
    singer: singerName(music.ar),
    name: music.name,
    album: music.al.name,
    image: music.al.picUrl
  })
}
