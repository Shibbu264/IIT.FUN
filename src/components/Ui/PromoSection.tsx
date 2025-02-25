import Link from "next/link";

export default function PromoSection({
    heading,
    text,
    image,
    link,
}: {
    heading: string;
    text: string;
    image: string;
    link: string;
}) {
    return (
        <div className="bg-primaryGreen text-black p-10 flex items-center justify-between border-2 border-black rounded-lg w-[90%] my-4">
            {/* Left Content */}
            <div className="max-w-md">
                <h1 className="text-4xl font-bold">{heading}</h1>
                <p className="mt-4 text-lg">{text}</p>
                <Link href={link} target="_blank">
                    <button className="mt-6 bg-black text-white px-6 py-3 text-lg font-semibold rounded-md">
                        Explore Now
                    </button>
                </Link>
            </div>

            {/* Right Image */}
            <div className="relative">
                <img src={image} alt="Promo Image" className="max-w-xs drop-shadow-lg" />
            </div>
        </div>
    );
}