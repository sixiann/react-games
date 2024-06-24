const Title: React.FC<{ text: string }> = ({ text }) => {
    return (
        <h1 className="font-sans font-extrabold">{text}</h1>
    )
}

export default Title;