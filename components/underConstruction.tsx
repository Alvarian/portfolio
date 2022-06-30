const UnderConstruction: React.FC<any> = ({
    alt,
    width
}) => {
    return (
        <div className={`w-full h-full relative bg-black/[0.8] flex justify-around ${width < 1000 ? "flex-col" : ""} items-center rounded-lg`}>
            <img src="/images/under-construction-sign.gif" alt="sign" />

            <div>
                <h2 className="text-3xl mb-5">Sorry!</h2>
                <p>The <strong>{alt.charAt(0).toUpperCase() + alt.slice(1)}</strong> section is under construction</p>
            </div>
        </div>
    )
}

export default UnderConstruction