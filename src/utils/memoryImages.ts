import getRandom from "./getRandom";

const images:string[] = [
    "https://media.allure.com/photos/65d8f1e8e923c6a4feaf9a02/16:9/w_2560%2Cc_limit/dua%2520lipa.jpg",
    "https://hips.hearstapps.com/hmg-prod/images/2jhcp9d-1668624680.jpg?crop=1.00xw:0.636xh;0,0.116xh&resize=1200:*",
    "https://i.insider.com/5bfee055dde86754441ae4cd?width=896&format=jpeg",
    "https://altselection.com/wp-content/uploads/2024/06/ac857c05df828406f16b20d027a2a1d1.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcpnLTrQXaIWivTd4La2nH_-Orm7147iq_bA&s",
    "https://i.pinimg.com/736x/cc/e4/93/cce4933997735ef85c156ce4c432c53c.jpg",
    "https://i.pinimg.com/originals/0d/d8/43/0dd843fb9c231a3e9cd72490dcc5f885.jpg",
    "https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2020/10/26/1ce7d400-172d-11eb-8f67-a484f6db61a1_image_hires_183648.jpg?itok=IEpOC30h&v=1603708617",
    "https://0.soompi.io/wp-content/uploads/2018/01/29102050/red-velvet-joy.jpg",
    "https://ca-times.brightspotcdn.com/dims4/default/43a13ce/2147483647/strip/true/crop/4480x6720+0+0/resize/2000x3000!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F02%2F97%2F0176bfbd448da80b56b05b6e18e9%2F1366455-env-dua-lipa-photo-10.jpg",
    "https://i8.amplience.net/i/naras/Dua-Lipa-2024-GRAMMYs-Performance",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStSG9uOKsq303RE22Hs6hJIzDbVxl74niskg&s",
    "https://i.pinimg.com/736x/da/4a/2c/da4a2cd5540eeff938d08a7ca31a68a8.jpg",
    "https://miamihighnews.com/wp-content/uploads/2022/05/Playboi_Carti-604x900.webp",
    "https://www.mensjournal.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk5MzM0MzQyNDI4NzMxMzQy/michael-b.jpg",
    "https://cdn.shopify.com/s/files/1/0434/4749/files/Thor_Haircut_1_grande.jpg?v=1575383188",
    "https://6.soompi.io/wp-content/uploads/image/eede4bbd419647faa049931eb3184d08.jpeg?s=900x600&e=t",
    "https://ichef.bbci.co.uk/news/1024/branded_news/16F61/production/_132094049_tyla_reid.jpg",
    "https://www.instyle.com/thmb/yeWJlnV28qS4IJBRuAYtGOaeTJE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MeganTheeStallionRevlonColorStay1-0c3a363933bc404392dab055f284a519.jpg",
    "https://www.byrdie.com/thmb/6xAGxrlcGPG0GlL5UgNKQe_Y3gY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/meganhair3-ec021fd767b440489b85cda948b70fc0.jpg",
    "https://www.billboard.com/wp-content/uploads/2024/03/Megan-Thee-Stallion-mean-girls-billboard-1548.jpg?w=942&h=623&crop=1",
    "https://m.media-amazon.com/images/I/71w91Q9hhPL._AC_UF1000,1000_QL80_.jpg",
]

const getRandomImages = ():string[] => {
    return getRandom(images, 6);
}

export default getRandomImages;