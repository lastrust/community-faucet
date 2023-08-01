import Image from "next/image";

const Info = () => {
  return (
    <div className="container mx-auto max-w-2xl shadow-xl sm:card sm:mt-16 sm:mb-16 overflow-hidden">
      <div className="card-body bg-primary text-primary-content">
        <h3 className="text-center text-4xl font-bold">What is the Faucet?</h3>
        <p className="text-center text-lg">
          It give you several times the cost of gas for free.
          <br />
          Like water spilling from a faucet.
        </p>
      </div>
      <div className="card-body bg-accent text-accent-content">
        <h3 className="text-center text-4xl font-bold">What is AStar Community Faucet?</h3>
        <p className="text-center text-lg">
          Faucet provided by the official is often broken, but it is important for beginners.
          <br />
          Therefore, it was created as a replacement for the official Faucet.
          <br />
          Moreover, this Faucet spills 10 times more ASTR|SDN than the official Faucet.
        </p>
      </div>

      <div className="card-body bg-secondary text-secondary-content">
        <h3 className="text-center text-4xl font-bold">Supporter NFT</h3>
        <p className="text-center text-lg">
          Faucet relies on the support of volunteers.
          <br />
          In return for their support, we give them a NFT as a proof of support.
          <br />
          If you are a Faucet user and know someone who has an NFT, please express your
          appreciation.
        </p>
        <figure className="relative">
          <Image
            width={800}
            height={400}
            src="/nft.png"
            className="rounded-lg"
            alt="supporter nft"
          />
        </figure>
      </div>
    </div>
  );
};

export default Info;
