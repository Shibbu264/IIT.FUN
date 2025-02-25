export default function PartnersDiv() {
    return (
        <div className="flex flex-col w-full items-center justify-center md:mb-24 max-md:mb-12">
            <p className="text-gray-400 text-[1.6rem] mb-6">partnered with</p>
            <div className="flex flex-wrap justify-center gap-8 px-4">
                <img src="/citrae.png" alt="Citrea" className="h-10 w-auto" />
                <img src="/nh.png" alt="Nakamoto Hub" className="h-10 w-auto" />
                <img src="/zo.png" alt="ZKSync" className="h-10 w-auto" />
                <img src="/nodops.png" alt="NodOps" className="h-10 w-auto" />
                <img src="/aptos.png" alt="Aptos" className="h-10 w-auto" />
            </div>
        </div>
    );
}