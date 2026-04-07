levels = [
  {
    id: 1,
    name: "Test Level",
    publisher: "Test",
    verifier: "Test",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    creators: ["Test"],
    points: 100,
    enjoyment: 50,
    song: { id: 1, url: "#" },
    gddl: 10,
    nlw: "-",
    tags: ["Test"],
    packs: ["Test Pack"],
    records: []
  }
];

filtered = levels;
renderList();
renderLevel(0);
