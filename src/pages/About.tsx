// import phone from "../assets/phone.png";

const About = () => {
  return (
    <div className="w-full h-max">
      <h1 className="text-3xl md:text-5xl font-bold my-7 text-gray-400 text-center mt-32 md:mt-20">
        About Us
      </h1>
      <div className="w-full flex-center">
        <div className="w-[80%] text-justify text-gray-500 text-sm">
          <span className="text-lg uppercase font-bold">
            Welcome to<span className="text-red-600"> Cineverse</span>,
          </span>{" "}
          <br /> <br /> Your ultimate destination for the latest and greatest in
          the world of movies! Here, we are passionate about bringing the magic
          of cinema to your screen with a comprehensive collection of movie
          trailers, cast information, and in-depth descriptions. <br /> <br />{" "}
          <span className="text-red-600">Our Mission</span> <br />
          <br />
          At Cinerverse, our mission is to create a seamless and engaging
          experience for movie enthusiasts everywhere. We believe that every
          film has a story to tell, and we are dedicated to showcasing these
          stories through high-quality trailers and detailed cast insights.{" "}
          <br />
          <br /> <span className="text-red-600">What We Offer</span> <br />
          <br />
          <ul className="ml-4 flex flex-col gap-2">
            <li>
              <strong>- Movie Trailers:</strong> Stay up-to-date with the latest
              releases, upcoming blockbusters, and hidden gems. Our curated
              selection of trailers provides a sneak peek into the cinematic
              experiences you won’t want to miss.
            </li>
            <li>
              <strong>- Cast Information:</strong> Get to know the stars of the
              silver screen. Our extensive database features detailed profiles
              of actors and actresses, including their filmography, career
              highlights, and interesting trivia.
            </li>
            <li>
              <strong>- In-Depth Descriptions: </strong>Dive deeper into each
              movie with our thoughtfully crafted descriptions. We provide you
              with plot summaries, genre information, and key details that
              enhance your viewing experience.
            </li>
          </ul>
          <br />
          <br />
          <span className="text-red-600">Why Choose Us?</span> <br /> <br />
          <ul className="ml-4 flex flex-col gap-2">
            <li>
              <strong>- Curated Content:</strong> Our team of movie buffs
              carefully selects and updates content to ensure you have access to
              the most relevant and exciting information.
            </li>
            <li>
              <strong>- User-Friendly Interface:</strong> Navigate through our
              website with ease. Our intuitive design ensures you can find what
              you're looking for quickly and efficiently.
            </li>
            <li>
              <strong>- Passion for Movies:</strong> We share your love for
              films and strive to create a community where movie lovers can
              explore, discover, and share their passion.
            </li>
          </ul>
          <br />
          <br />
          <span className="text-red-600">Join Our Community</span> <br />
          <br />
          Become a part of the <span className="text-red-600">
            Cineverse
          </span>{" "}
          community! Sign up and engage with fellow movie enthusiasts. Together,
          let’s celebrate the art of filmmaking and the joy of watching movies.{" "}
          <br /> <br /> Thank you for visiting{" "}
          <span className="text-red-600">Cineverse</span> . Sit back, relax, and
          enjoy the show!
        </div>
      </div>
    </div>
  );
};

export default About;
