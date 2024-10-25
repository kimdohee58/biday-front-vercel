'use client';

type CardProps = {
    onClick: () => void;
    file: File | null;
}

export default function ImageCard({onClick, file}: CardProps) {

    const imageUrl = file ? URL.createObjectURL(file) : "https://www.material-tailwind.com/image/dark-image.png";

    return (
        <>
            <div
                className={`relative rounded-lg lg:h-40 md:h-36 h-24 w-full ${!file ? 'bg-grey-200' : ''} bg-cover bg-center bg-no-repeat cursor-pointer`}
                onClick={onClick}
                style={{backgroundImage: `url(${imageUrl}` }}>
                {!file && (
                    <div className="flex justify-center items-centerh-full">
                        <span>  </span>
                    </div>
                )}
                {file && (
                    <div className="flex w-full h-full items-end justify-end p-1"/>
                )}
            </div>
        </>
    );


}