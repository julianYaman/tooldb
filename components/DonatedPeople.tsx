import Image from "next/image";

export default function DonatedPeople(props: any) {

    return (
        <div className="flex place-content-center gap-3 text-white">
            <div className="donated_person">
                <Image src="https://ui-avatars.com/api/" className="w-fill rounded-lg" width={"100px"} height={"100px"}/>
                <h3>Be the first :)</h3>
            </div>
        </div>
    );
}
