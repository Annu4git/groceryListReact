const Footer = ({ length }) => {
  return (
    <footer>Total {length === 1 ? 'item' : 'items' } : {length}</footer>
  )
}

export default Footer