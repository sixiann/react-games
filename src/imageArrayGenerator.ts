
import lodash from "lodash";

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
    "https://static.wikia.nocookie.net/disney/images/8/86/Sabrina_Carpenter.jpg/revision/latest?cb=20191226235526",
    "https://i.pinimg.com/736x/da/4a/2c/da4a2cd5540eeff938d08a7ca31a68a8.jpg",
]

const getRandomImages = ():string[] => {
    const shuffledImages = lodash.shuffle(images);
    const randomImages = shuffledImages.slice(0, 6);
    return randomImages;
}

export default getRandomImages;