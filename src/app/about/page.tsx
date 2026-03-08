import React from "react";
import Text from "@/components/Text";
import classes from "./About.module.scss";

export default function AboutPage() {
  return (
    <div className={classes.about}>
      <Text tag="h1" view="title" weight="bold">
        About Lalasia
      </Text>

      <div className={classes.content}>
        <Text view="p-20" color="secondary">
          Welcome to Lalasia, your premier destination for quality furniture and
          home decor. We believe that every home deserves beautiful, functional
          pieces that reflect your unique style.
        </Text>

        <Text tag="h2" view="p-22" weight="bold">
          Our Mission
        </Text>
        <Text view="p-20" color="secondary">
          {`At Lalasia, we're committed to providing exceptional furniture that combines style, 
          comfort, and durability. We carefully curate our collection to ensure every piece 
          meets our high standards of quality and design.`}
        </Text>

        <Text tag="h2" view="p-22" weight="bold">
          What We Offer
        </Text>
        <Text view="p-20" color="secondary">
          {`From modern minimalist designs to classic timeless pieces, our extensive catalog 
          features furniture for every room in your home. Whether you're furnishing a new space 
          or refreshing your current one, Lalasia has everything you need to create your dream interior.`}
        </Text>

        <Text tag="h2" view="p-22" weight="bold">
          Why Choose Us
        </Text>
        <Text view="p-20" color="secondary">
          We pride ourselves on competitive pricing, fast shipping, and
          outstanding customer service. Every product in our store is selected
          with care, ensuring you receive only the best quality furniture for
          your home.
        </Text>
      </div>
    </div>
  );
}
