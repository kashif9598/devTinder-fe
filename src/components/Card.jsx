const Card = ({user}) => {
  const { firstName, lastName, photoUrl, about, skills, age, gender } = user;
  return (
    <div className="flex justify-center my-20">
      <div className="card bg-[#602325] w-96 shadow-xl">
        <figure>
          <img
            src={photoUrl}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <p>{age}, {gender}</p>
          <p>{about}</p>
          <div className="card-actions justify-center my-5">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
