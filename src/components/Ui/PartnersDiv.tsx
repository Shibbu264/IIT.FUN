export default function PartnersDiv() {
    return (
        <div className="flex flex-col w-full items-center justify-center md:mb-24 max-md:mb-12">
            <p className="text-gray-400 text-[1.6rem] mb-6">partnered with</p>
            <div className="flex flex-wrap justify-center gap-8 px-4">
                <img src="/vara-logo-white.jpeg" alt="Vara" className="h-12 w-auto" />
                <img src="/citrae.jpeg" alt="Citrea" className="h-12 w-auto" />
                <img src="/nh.jpeg" alt="Nakamoto Hub" className="h-12 w-auto" />
                <img src="/zo.jpeg" alt="ZKSync" className="h-12 w-auto" />
                <img src="/nodops.jpeg" alt="NodOps" className="h-12 w-auto" />
                <img src="/aptos.jpeg" alt="Aptos" className="h-12 w-auto" />
            </div>
        </div>
    );
}