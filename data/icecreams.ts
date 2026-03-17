export type ConeType = "azucarado" | "sencillo";

export type IceCreamOption = {
  flavor: string;
  image: string;
};

export const icecreams: Record<ConeType, IceCreamOption[]> = {
  azucarado: [
    {
      flavor: "algodon",
      image: "/icecreams/transformed/azucarados/algodon.png",
    },
    {
      flavor: "chicle",
      image: "/icecreams/transformed/azucarados/chicle.png",
    },
    {
      flavor: "chocochips",
      image: "/icecreams/transformed/azucarados/chocochips.png",
    },
    {
      flavor: "chocolate",
      image: "/icecreams/transformed/azucarados/chocolate.png",
    },
    {
      flavor: "churchill",
      image: "/icecreams/transformed/azucarados/churchill.png",
    },
    {
      flavor: "fresa",
      image: "/icecreams/transformed/azucarados/fresa",
    },
    {
      flavor: "galleta",
      image: "/icecreams/transformed/azucarados/galleta.png",
    },
    {
      flavor: "limon",
      image: "/icecreams/transformed/azucarados/limon.png",
    },
    {
      flavor: "naranja",
      image: "/icecreams/transformed/azucarados/naranja.png",
    },
    {
      flavor: "vainilla",
      image: "/icecreams/transformed/azucarados/vainilla.png",
    },
  ],
  sencillo: [
    {
      flavor: "algodon",
      image: "/icecreams/transformed/sencillos/algodon.png",
    },
    {
      flavor: "chicle",
      image: "/icecreams/transformed/sencillos/chicle.png",
    },
    {
      flavor: "chocolate",
      image: "/icecreams/transformed/sencillos/chocolate.png",
    },
    {
      flavor: "churchill",
      image: "/icecreams/transformed/sencillos/churchill.png",
    },
    {
      flavor: "fresa",
      image: "/icecreams/transformed/sencillos/fresa.png",
    },
    {
      flavor: "galleta",
      image: "/icecreams/transformed/sencillos/galleta.png",
    },
    {
      flavor: "limon",
      image: "/icecreams/transformed/sencillos/limon.png",
    },
    {
      flavor: "naranja",
      image: "/icecreams/transformed/sencillos/naranja.png",
    },
    {
      flavor: "vainilla",
      image: "/icecreams/transformed/sencillos/vainilla.png",
    },
  ],
};
