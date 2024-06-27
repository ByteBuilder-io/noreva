const ComponentRenderer = ({
  component,
  data,
}: {
  component: string
  data: any
}) => {
  if (component === 'reference') return <></>
  const Component = require(`../componentsSanity/${component}`).default
  return <Component data={data} />
}

export default ComponentRenderer
