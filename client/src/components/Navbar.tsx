interface Props {
	name: string | null | undefined
}

const Navbar = (props: Props) => {
	return (
		<div className="font-mono"><strong><em>{props.name}</em></strong>, start chating!</div>
	)
}

export default Navbar