// import React from "react";
import contact from "../../assets/about/contact.png";
import c from "../../assets/about/c.png";
import j from "../../assets/about/j.png";
import v from "../../assets/about/v.png";
import w from "../../assets/about/w.png";
import wo from "../../assets/about/wo.png";
import m from "../../assets/about/m.png"

function About() {
  return (
    <>
      <div >
        <div
          className="h-screen bg-contain relative  bg-no-repeat"
          style={{ backgroundImage: `url(${contact})` }}
        >
          <h1 className="font-bold italic text-cyan-200 text-4xl absolute top-[30px] left-[650px]  ">
            About Us{" "}
          </h1>
          <p className="text-xl text-white text-justify absolute top-[80px] left-[110px] w-[1250px] p-8  ">
           Welcome to Handmade Crafts, we celebrate the art of handmade craftsmanship. Each product is thoughtfully created with love, care, and attention to detail, ensuring not just beauty but quality in every piece. We believe that handmade items carry a story and a unique charm that mass-produced products can never replicate. From concept to creation, our focus is on bringing you products that are both functional and aesthetically pleasing, reflecting the passion of skilled artisans.Every item you purchase supports local artisans and helps preserve traditional techniques that have been passed down through generations.
          </p>
        </div>

        <div className="absolute flex p-4 gap-25 ml-15 top-[435px] ">
          <img
            src={j}
            alt="j"
            className="w-[250px] h-[254px] object-cover rounded-lg  "
          />
          <img
            src={c}
            alt="c"
            className="w-[250px] h-[254px] object-cover rounded-lg"
          />
          <img
            src={w}
            alt="w"
            className="w-[250px] h-[254px] object-cover  rounded-lg"
          />
          <img
            src={wo}
            alt="wo"
            className="w-[250px] h-[254px] object-cover rounded-lg"
          />
        </div>

          <div className="flex gap-10 pl-20 pb-20 pr-20">
            <div className="text-justify">
           <h2 className="font-bold italic text-4xl pb-5">Mission</h2> 
          <p className="text-xl  border-l-4 border-[#E1BB50] p-2">
           Our mission is to create unique, high-quality handmade products that bring joy to our customers while supporting skilled artisans. We are committed to preserving traditional craftsmanship, using sustainable materials, and promoting ethical practices that make a positive impact on communities and the environment. Every product we make tells a story, connecting people with authentic, meaningful creations.
          </p>
            </div>
         
          <div>
            <img src={m}  className="w-[2000px] h-[300px] object-cover rounded-lg" />
          </div>
        </div>

         <div className="flex gap-10 pl-20 pb-20 pr-20 ">
          <div>
            <img src={v}  className="w-[2000px] h-[300px] object-cover rounded-lg" />
          </div>
          <div className=" text-justify">
            <h2 className="font-bold italic text-4xl pb-5">Vision</h2> <br />
            <p className="text-xl  border-l-4 border-[#E1BB50] pl-2">
              Our vision is to become a recognized brand known for excellence in handmade artistry and sustainability. We aim to inspire a culture that values creativity, authenticity, and conscious consumption, while empowering local artisans and preserving cultural heritage for future generations.
            </p>
          </div>
        </div> 

      </div>
    </>
  );
}

export default About;