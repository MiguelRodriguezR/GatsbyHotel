exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allDatoCmsRoom {
        nodes {
          slug
        }
      }
    }
  `)

  if(result.errors){
      reporter.panic('No results', result.errors);
  }

  const rooms = result.data.allDatoCmsRoom.nodes;

  rooms.forEach( room => {
      actions.createPage({
          path: room.slug,
          component: require.resolve('./src/components/rooms.jsx'),
          context: { slug: room.slug }
      })
  })
}
