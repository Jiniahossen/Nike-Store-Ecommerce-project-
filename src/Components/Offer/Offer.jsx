import { useEffect, useState } from "react";
import Container from "../Shared/Container/Container";

const Offer = () => {
    const [offer, setOffer] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/items')
            .then((res) => res.json())
            .then(data => {
                console.log(data);
                setOffer(data);
            });
    }, []);

    return (
        <div className="mt-20">
            <Container>
                <h1 className="text-2xl font-serif mb-4">Todays Offer</h1>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                    {offer.map(item => (
                        <div key={item._id} className="rounded-lg h-[200px] bg-cover" style={{backgroundImage: `url(${item.category_img})`}}>
                           
                           <div className=" h-[70px] md:h-[50px] backdrop-blur-[2px] bg-white/50  mt-[130px] md:mt-[150px] flex  justify-center items-center">
                             <h1 className="text-2xl font-serif text-black text-center">{item.category_name}</h1>
                           </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Offer;
