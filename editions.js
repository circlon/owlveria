/* Each language is a separately edited book. Asterisks mark italic type. */
const editions = {
  en: {
    name: "English", book: "A book of curiosities", contents: "Contents", language: "Book language",
    previous: "Previous", next: "Next story", close: "Close", source: "Source", skip: "Skip to the story",
    privacy: "Uploader privacy policy", about: "Owlveria is an illustrated book about familiar things with unfamiliar histories. Each language opens a different collection. Explore a picture to uncover the rest of its story.",
    stories: [
      {
        id: "the-missing-portrait", place: "Paris · 1911", title: "The day the *Mona Lisa* vanished",
        pages: [
          {
            plate: 0,
            left: ["On 21 August 1911, a small portrait disappeared from the Louvre. Leonardo’s most famous sitter had left the building.", "If you could lift a corner of the picture like a poster, the story would be a good deal simpler. Leonardo painted on a panel of poplar. Whoever walked out with the lady had to carry a solid piece of wood."],
            right: ["More than two years went by before a man brought the painting to an art dealer in Florence. He knew the Louvre rather well. Who was he?", "Look at the space inside the carved frame. If the sitter stepped out of it, you could still tell exactly how big the missing picture was. The wall was left with the shape of its loss."],
            reveal: "Vincenzo Peruggia was a glazier who had worked at the Louvre. When he offered the portrait to the dealer, the dealer alerted the authorities. The painting could finally go home.",
            spot: "vignettes/mona-c05_beroud.png"
          },
          {
            title: "An appointment in *Florence*",
            plate: 1,
            left: ["In December 1913 an art dealer named Alfredo Geri had an extraordinary offer to consider. A man in Florence claimed to have Leonardo’s portrait. Geri had a good reason to bring someone else along to see it.", "His companion was Giovanni Poggi, director of the Uffizi. Imagine being asked to decide whether the picture in front of you was the one an entire museum had spent two years looking for."],
            right: ["The man with the painting was Vincenzo Peruggia. He had worked at the Louvre as a glazier. Our illustrator has tucked the picture under his arm. Follow the sleeve down and there she is, quite calm amid all the commotion.", "When the painting was identified, the Italian authorities took charge of it. But the lady still had a few stops to make before she went home."],
            spot: "vignettes/mona-c10_dealers.png",
            source: ["Archivio di Stato di Firenze", "https://archiviodistatofirenze.cultura.gov.it/asfi/mostre/io-sono-e-mi-chiamo-peruggia-vincenzo/monna-lisa-in-italia"]
          },
          {
            title: "The lady takes *the long way home*",
            plate: 0,
            left: ["For five days that December, visitors could see the recovered portrait at the Uffizi in Florence. She also went to Rome and Milan. On the evening of 30 December she finally left Milan for France.", "Nowadays the painting has a roomful of visitors and a glass case of its own. A guard could watch the room without ever noticing one of the things the glass is there to guard against."],
            right: ["Over the centuries the wooden panel has warped and a crack has appeared. The case keeps the temperature and humidity steady, looking after the wood as well as the paint.", "Look past the smile to the distant landscape. Every winding path and every blue hill has made the entire journey on that one small board."],
            spot: "vignettes/mona-x_newsboy.png"
          }
        ],
        action: "Follow the painting", back: "Return to the gallery",
        plates: [
          { art: "mona", caption: "Leonardo’s missing sitter.", alt: "Owlveria’s drawing of the Mona Lisa in a carved frame." },
          { art: "peruggia", caption: "Peruggia and his very conspicuous parcel.", alt: "Vincenzo Peruggia in his work coat, carrying the little portrait under his arm." }
        ],
        source: ["Musée du Louvre", "https://www.louvre.fr/en/explore/the-palace/from-the-mona-lisa-to-the-wedding-feast-at-cana"]
      },
      {
        id: "libertys-copper-coat", place: "New York Harbor · 1886", title: "Liberty’s *other color*",
        pages: [
          {
            plate: 0,
            left: ["Picture the Statue of Liberty from the deck of the ferry. Now imagine arriving in New York for the unveiling in 1886. You would have seen a statue the color of a new penny.", "From the water the folds of her robe look heavy enough to be carved from a cliff. Follow one fold up to the shoulder. The layer that gives it shape is surprisingly thin."],
            right: ["Look at the green cheek in the drawing. The statue has worn that color for so long that it’s easy to imagine somebody chose it from a paint chart.", "Try to imagine the crown in two pencil boxes. One needs warm browns and reds. The other needs greens. A person could have visited the same harbor in different years and needed both boxes."],
            reveal: "Under the green is copper. Years of exposure to the air formed a patina on its surface. The green layer even helps protect the metal underneath.",
            spot: "vignettes/liberty-penny.png"
          },
          {
            title: "Two pennies *on edge*",
            plate: 1,
            left: ["Put two American pennies in a stack and look at them edge on. The National Park Service uses that tiny stack to give a sense of the thickness of Liberty’s copper skin, about 2.4 millimeters.", "Now look again at the chin in the drawing. Beyond it is a hollow interior. A framework inside the statue helps carry the great copper shape high above the harbor."],
            right: ["What looks like a massive solid cheek from the ferry is a shaped sheet. Its curve does much of the work of convincing your eye that there is a whole, heavy face behind it.", "Imagine tapping the edge of your two pennies on a table. That small sound belongs to an object you can hold between two fingers. The comparison reaches all the way up to Liberty’s crown."],
            spot: "vignettes/liberty-hand_pennies.png"
          },
          {
            title: "A flame that *stayed gold*",
            plate: 0,
            left: ["The green came a little at a time as the exposed copper reacted with its surroundings. The layer that formed on the surface is called a patina. It helps shield the copper beneath it.", "There is one very bright exception to the color scheme. Look above the green arm, where the flame catches the sun."],
            right: ["The replacement torch installed in 1986 has a copper flame covered in gold leaf. Its light in the daytime is sunlight bouncing off the gold.", "So the next time you sketch Liberty, save one small patch of yellow. The robe tells a story about copper left open to the weather. The flame tells a story about copper dressed in another metal."],
            spot: "vignettes/liberty-girl_phone.png"
          }
        ],
        action: "Go back to 1886", back: "Come back to the harbor",
        plates: [
          { art: "liberty-today", caption: "The familiar face in New York Harbor.", alt: "The Statue of Liberty drawn in green pencil." },
          { art: "liberty-copper", caption: "The color of a fresh copper penny.", alt: "Liberty with a copper-colored face, crown and robe." }
        ],
        source: ["National Park Service", "https://www.nps.gov/stli/planyourvisit/frequently-asked-questions-statue-of-liberty.htm"]
      }
    ]
  },
  es: {
    name: "Español", book: "Un libro de curiosidades", contents: "Índice", language: "Idioma de la edición",
    previous: "Anterior", next: "Otro relato", close: "Cerrar", source: "Fuente", skip: "Ir al relato", privacy: "Privacidad de Uploader",
    about: "Owlveria cuenta historias ilustradas sobre cosas conocidas que aún guardan sorpresas. Cada idioma abre una colección distinta. Toca un dibujo para descubrir el detalle que falta.",
    stories: [
      {
        id: "el-sombrero-de-la-catrina", place: "Ciudad de México · 1947", title: "El sombrero llegó *antes que el vestido*",
        pages: [
          {
            plate: 0,
            left: ["A la Catrina se la reconoce hasta de lejos por su sombrero de plumas. Pero a quien buscara su elegante vestido en la estampa de José Guadalupe Posada le esperaba una sorpresa.", "Empieza por el ala del sombrero y sigue las plumas hasta la punta. Ocupan más espacio que la cara. Debajo de semejante despliegue asoman dos cuencas vacías y una dentadura que parece divertirse tanto como nosotros."],
            right: ["La Calavera Garbancera de Posada tenía sombrero, sonrisa y huesos a la vista. Para saber de dónde salió el vestido hay que pasar del papel a una pared.", "Una estampa podía pasar de mano en mano. Piensa en lo poco que necesitaba llevarse cada lector para reconocer al personaje en otro sitio. Bastaban el sombrero y aquella sonrisa imposible de disimular."],
            reveal: "En 1947, Diego Rivera pintó a la Catrina de cuerpo entero en su mural de la Alameda Central. A su lado puso a Posada y a un Diego niño. La calavera del grabador por fin tenía con quién salir a pasear.",
            spot: "vignettes/catrina-f05a1.png",
            source: ["Secretaría de Cultura de México", "https://todo.cultura.gob.mx/detalle/museo-mural-diego-rivera"]
          },
          {
            title: "Un paseo *por la Alameda*",
            plate: 1,
            left: ["En el centro del mural de Diego Rivera hay gente paseando tan junta que se podría pasar lista sin moverse del sitio. Entre los rostros de carne y hueso destaca uno al que precisamente le falta la carne.", "La Catrina aparece de cuerpo entero. Lleva un vestido largo y sigue luciendo el sombrero que permite reconocerla desde lejos. Busca sus manos. Ahora tiene a quién darle la mano."],
            right: ["A un lado está José Guadalupe Posada, el grabador que dibujó aquella calavera. Al otro, Rivera se pintó a sí mismo de niño. Frida Kahlo aparece detrás de él.", "Así reunió el pintor, en un solo paseo, al autor del antiguo dibujo, a su personaje y al niño que él mismo había sido. Una pared les dio sitio a los tres."],
            spot: "vignettes/catrina-f01.png"
          },
          {
            title: "La pared *también viajó*",
            plate: 0,
            left: ["Rivera pintó Sueño de una tarde dominical en la Alameda Central para el comedor del Hotel del Prado. Imagínate escoger mesa delante de una multitud pintada que nunca termina su paseo.", "En septiembre de 1985 los terremotos dañaron gravemente el hotel. Había que encontrarle otra casa a la obra. Y una pared llena de gente cuesta bastante más de mover que una hoja de papel."],
            right: ["El mural fue rescatado y trasladado al terreno donde se construiría el museo que hoy lo guarda. Esta vez se mudó la Alameda entera, con sus árboles, sus paseantes y la Catrina en medio.", "La primera calavera cabía en una estampa. Su descendiente necesitó un museo. En las dos todavía se puede empezar la búsqueda por el mismo sombrero."],
            spot: "vignettes/catrina-f05a1.png"
          }
        ],
        action: "Pasar de la estampa al mural", back: "Volver a la estampa",
        plates: [
          { art: "catrina-print", caption: "La calavera con su sombrero de plumas.", alt: "Una estampa dibujada de la calavera con un gran sombrero rosa." },
          { art: "catrina-rivera", caption: "La Catrina vestida para pasear por la Alameda.", alt: "La Catrina con un vestido rosa largo, rodeada de los personajes del mural." }
        ],
        source: ["Secretaría de Cultura de México", "https://todo.cultura.gob.mx/detalle/museo-mural-diego-rivera"]
      },
      {
        id: "el-guia-de-machu-picchu", place: "Perú · 1911", title: "El niño que conocía *Machu Picchu*",
        pages: [
          {
            plate: 0,
            left: ["Cuando Hiram Bingham subió a Machu Picchu, en julio de 1911, no llevaba un plano de las ruinas. Arriba encontró familias que cultivaban las antiguas terrazas.", "Desde abajo era difícil adivinar lo que había al otro lado de la vegetación. En el valle, sin embargo, ya había gente que podía señalar la montaña por su nombre y decir por dónde empezaba la subida."],
            right: ["Bingham buscaba muros incas entre la maleza. Alguien de la casa sabía exactamente qué camino tomar.", "Fíjate en las terrazas. Cada escalón ancho ofrece un trozo de suelo más o menos llano en una pendiente muy empinada. Para una familia que sembraba allí, esos escalones tenían una utilidad de todos los días."],
            reveal: "Un niño de una de las familias le enseñó el camino hasta los edificios de piedra. Bingham contaría la visita a lectores de todo el mundo. Para el niño, aquellas ruinas formaban parte del paisaje de casa.",
            spot: "vignettes/machu-f07b.png"
          },
          {
            title: "El camino *pasaba por casa*",
            plate: 1,
            left: ["El 24 de julio, el agricultor Melchor Arteaga acompañó a Bingham en la subida. Iba también el sargento Carrasco. A medida que el grupo ganaba altura, el río Urubamba quedaba más abajo.", "Arriba encontraron a familias que vivían y cultivaban en las terrazas. Al llegar a las casas cambió el guía. Un muchacho del lugar acompañó al visitante hacia las construcciones de piedra."],
            right: ["Mira la escena desde la puerta de la casa. Para el recién llegado, el siguiente recodo podía esconder un edificio desconocido. Para el chico era un lugar al que sabía llegar sin consultar un mapa.", "Cuando leas que alguien encontró una ciudad, vale la pena detenerse un momento en ese encuentro. En esta historia hubo que preguntar el camino más de una vez."],
            spot: "vignettes/machu-c_llama.png"
          },
          {
            title: "Lo que *cuenta una foto*",
            plate: 0,
            left: ["En el relato que Bingham publicó para los lectores de National Geographic hay fotografías de terrazas, escaleras y puertas. Una muestra escalones tallados en un solo bloque de granito.", "Un dibujo de conjunto permite seguir la forma de la montaña. Una foto cercana de esos escalones cuenta otra cosa. Alguien tuvo que decidir dónde pondría el pie la persona que subiera después."],
            right: ["Las imágenes circularon lejos de Perú y dieron a conocer Machu Picchu a muchísimos lectores. Las familias de la montaña ya sabían qué había detrás de aquellas piedras.", "Vuelve a mirar las terrazas desde la parte de abajo del dibujo. Ahora puedes imaginar dos recorridos por el mismo lugar. Uno fue una expedición que llenó cuadernos. El otro empezaba en casa."],
            spot: "vignettes/machu-f10a.png"
          }
        ],
        action: "Conocer a los vecinos", back: "Volver a las terrazas",
        plates: [
          { art: "machu-terraces", caption: "Piedra, andenes y caminos en la montaña.", alt: "Andenes incas y muros de piedra dibujados a lápiz en Machu Picchu." },
          { art: "machu-family", caption: "Las familias que vivían en las terrazas.", alt: "Familias de los Andes con prendas rojas, en una ilustración de Owlveria." }
        ],
        source: ["Relato de Hiram Bingham", "https://www.nationalgeographic.com/magazine/article/machu-picchu-peru-inca-hiram-bingham-discovery"]
      }
    ]
  },
  ja: {
    name: "日本語", book: "ふしぎの絵本", contents: "目次", language: "本の言語",
    previous: "前の話", next: "次の話", close: "閉じる", source: "出典", skip: "本文へ", privacy: "Uploader のプライバシーポリシー",
    about: "Owlveria は、見慣れたものにひそむ不思議をたどる絵本です。言語を選ぶと、別の物語が開きます。絵に触れると、その続きが読めます。",
    stories: [
      {
        id: "nami-no-ao", place: "江戸 · 1830年代", title: "北斎の波には、*青が二つ*",
        pages: [
          {
            plate: 0,
            left: ["「神奈川沖浪裏」の波を近くで見ると、明るい青の中を濃い青の筋が走っています。同じ青を濃くしたり薄くしたりしたように見えます。", "まず、いちばん大きな波の向こうを見てください。波と舟のすき間に、白い頂がちょこんと顔を出しています。あんなに大きい富士山が、この絵の中では波にのまれそうなほど小さいのです。"],
            right: ["メトロポリタン美術館が版画の色を調べると、摺師が紙の上で二つの青を重ねた跡が見えてきました。", "波頭の白いところから、青い筋を一本だけ指でたどってみましょう。曲がるたびに太さが変わり、海水が手前に盛り上がって見えてきます。"],
            reveal: "濃い筋には藍とベロ藍を混ぜて使い、その上から鮮やかなベロ藍を摺っていました。同じ場所を二度摺ることで、波のくぼみに奥行きが生まれます。",
            spot: "vignettes/wave-fuji.png"
          },
          {
            title: "一枚の紙を*二度摺る*",
            plate: 1,
            left: ["浮世絵の木版画では、版木の表面に色をのせて紙に写します。違う色を重ねるときは、同じ紙をもう一度、版にぴたりと合わせなくてはなりません。", "メトロポリタン美術館の調査で、濃い線には藍とベロ藍が混ぜてあることがわかりました。その上に明るいベロ藍を重ねると、波の谷の青がぐんと深くなります。"],
            right: ["ただ一色を厚く塗ったのだとしたら、二つの色が少しずれて見える縁はできません。紙のすみまで調べると、摺った人の手順が残っているのです。", "目を離して見ると、今度は線が一本ずつ見えなくなります。そのかわり、舟を包みこむような大きな水の動きが戻ってきます。"],
            spot: "vignettes/wave-hand.png"
          },
          {
            title: "波の絵に*山を探す*",
            plate: 0,
            left: ["この絵は「冨嶽三十六景」の一枚です。題名を先に聞いた人なら、まず富士山を探すでしょう。ところが、目に飛び込んでくるのは手前の大波です。", "波の内側をくぐるようにして、視線を奥へ動かしてみてください。小さな富士の斜面と、手前でせり上がる水の斜面。ずいぶん違う大きさの三角形が向かい合っています。"],
            right: ["当時、版元は、このシリーズに新しい青を使うことを売り物にしました。北斎の構図に、色を選んだ人、版を彫った人、紙を重ねて摺った人の仕事が加わっています。", "今度は富士山のほうから波を見返してみましょう。同じ一枚なのに、さっきまで一番小さかったものが、絵全体を見るための目印になります。"],
            spot: "vignettes/wave-fuji.png"
          }
        ],
        action: "波の筋を拡大する", back: "波の全体を見る",
        plates: [
          { art: "great-wave", caption: "波の向こうに、小さな富士山。", alt: "青い大波に三艘の舟が揺れ、遠くに富士山が見える絵。" },
          { art: "wave-detail", caption: "波頭と、濃い青の筋を大きく。", alt: "大波の青い筋と白い波頭を拡大したイラスト。" }
        ],
        source: ["メトロポリタン美術館", "https://www.metmuseum.org/essays/hokusai-great-wave"]
      },
      {
        id: "fuji-no-okumiya", place: "日本 · 富士山", title: "山のてっぺんは*誰のもの？*",
        pages: [
          {
            plate: 0,
            left: ["富士山を麓から眺めても、斜面に土地の境目は見えません。ところが山頂には鳥居があり、その先には富士山本宮浅間大社の奥宮があります。", "地図で山を探すと、山の名前はたいてい頂の近くに書いてあります。でも実際に火口の縁に立てば、頂上は一つの点には収まりません。道が延び、お宮があり、その先にもまた峰が見えます。"],
            right: ["神社の境内は、鳥居をくぐった先の小さな敷地だけでしょうか。視線を少し下まで移してみましょう。", "鳥居の二本の柱のあいだをのぞいてみましょう。石や空をひと続きに眺めていた目に、人が何度も通ってきた道が見えてきます。"],
            reveal: "八合目から上は、国有地などを除く大部分が浅間大社の境内です。山麓の本宮と山頂の奥宮は、同じ神社の二つのお宮なのです。",
            spot: "vignettes/fuji-c_crow.png"
          },
          {
            title: "ふもとと*火口の縁*",
            plate: 1,
            left: ["静岡県富士宮市にある本宮と、富士山頂にある奥宮。名前を並べるとすぐ隣にありそうですが、お参りに行く人にとって、その間には山を登るだけの距離があります。", "山頂の土地のうち、八合目より上の大部分は浅間大社の境内です。登山道などには例外があります。鳥居だけを境目の印にしていたら、ずいぶん小さく見積もってしまいます。"],
            right: ["目の前の社殿から少し離れて、斜面全体を思い浮かべてみてください。お宮の話をしていたはずなのに、いつのまにか地図を広げたくなる広さです。", "ふもとから見ればなだらかな山の輪郭も、歩く人にとっては、次々に別の景色が現れる長い道なのです。"],
            spot: "vignettes/fuji-k_roll.png"
          },
          {
            title: "山頂を*ひとまわり*",
            plate: 0,
            left: ["火口の縁をめぐる道を歩くことを「お鉢めぐり」といいます。絵の鳥居がある場所から視線を横へずらすと、火口を取り巻く峰が続いています。", "山頂には奥宮のほかに久須志神社もあります。さらに、雪解け水がしみ出る「金明水」「銀明水」と呼ばれる場所まであります。どれも信仰の歴史を伝える山頂の見どころです。"],
            right: ["遠くから富士山を描くとき、山頂に使える紙はほんのわずかです。そこへ道も水もお宮も描き入れようとしたら、いくら細い鉛筆でも足りないでしょう。", "そこで二枚の絵の出番です。一枚では火口の広さを、もう一枚では鳥居の向こうを眺めてください。同じ山が、二つの縮尺で見えてきます。"],
            spot: "vignettes/fuji-c_crow.png",
            source: ["山梨県立富士山世界遺産センター", "https://www.fujisan-whc.jp/about/parts/index.html"]
          }
        ],
        action: "山頂の鳥居に近づく", back: "山頂を見渡す",
        plates: [
          { art: "fuji-summit", caption: "火口を望む山頂の鳥居。", alt: "富士山頂の朱色の鳥居。石段の上に小さな社殿が見える。" },
          { art: "fuji-shrine", caption: "山頂にある浅間大社の奥宮。", alt: "山頂の鳥居の奥に見える社殿を近くから描いた絵。" }
        ],
        source: ["静岡県", "https://www.pref.shizuoka.jp/kankosports/kanko/mtfuji/1002813/1019314.html"]
      }
    ]
  },
  ko: {
    name: "한국어", book: "그림으로 읽는 호기심 사전", contents: "목차", language: "책 언어",
    previous: "이전 이야기", next: "다음 이야기", close: "닫기", source: "출처", skip: "본문으로", privacy: "Uploader 개인정보 처리방침",
    about: "Owlveria는 익숙한 사물에 숨은 이야기를 들려주는 그림책입니다. 언어를 바꾸면 다른 이야기 모음이 열립니다. 그림을 눌러 뒷이야기를 펼쳐 보세요.",
    stories: [
      {
        id: "geobukseon-geurim", place: "조선 · 1795년", title: "우리가 아는 *거북선의 얼굴*",
        pages: [
          {
            plate: 0,
            left: ["거북선의 모습을 떠올려 보세요. 둥글게 덮인 등과 뱃머리의 용이 먼저 생각나지요. 그런데 이순신이 지휘하던 시기의 거북선 실물은 오늘날 남아 있지 않습니다.", "종이 한 장과 연필 한 자루가 있다면 어디서부터 그릴까요? 누군가는 용의 눈부터, 누군가는 거북 등처럼 굽은 선부터 그릴 겁니다. 둘 다 같은 배를 떠올렸는데도 첫 줄은 꽤 다르겠지요."],
            right: ["그렇다면 박물관에서 보는 거북선 모형의 바탕이 된 그림은 언제 그렸을까요?", "그림 옆에 그린 날짜를 작게 적어 봅시다. 배가 바다를 누빈 때와 화가가 종이에 선을 그은 때 사이에는 우리가 미처 생각하지 못한 시간이 놓여 있습니다."],
            reveal: "1795년에 펴낸 《이충무공전서》에는 두 가지 거북선 그림이 실려 있습니다. 임진왜란으로부터 약 200년 뒤에 남긴 자료입니다. 오늘날의 복원에는 이런 그림과 옛 기록을 함께 씁니다.",
            spot: "vignettes/turtle-ship_head.png"
          },
          {
            title: "한 권 속에 *두 척*",
            plate: 1,
            left: ["1795년, 정조 때 이순신과 관련된 기록을 모아 《이충무공전서》라는 책을 펴냈습니다. 그 안에는 거북선 그림이 한 장만 들어 있는 것이 아닙니다. 두 그림에는 서로 다른 이름이 붙어 있습니다.", "한쪽은 통제영 거북선이고 다른 쪽은 전라좌수영 거북선입니다. 책장을 넘기는 독자는 같은 이름의 배도 시기와 장소에 따라 모습이 달랐다는 단서를 만나게 됩니다."],
            right: ["옛 그림의 가는 먹선을 따라가 보세요. 화가가 무엇을 뚜렷하게 보여 주고 싶었는지 눈에 들어옵니다. 하지만 그림 속 종이는 평평해서 반대편으로 돌아가 볼 수는 없습니다.", "그래서 그림 곁의 글도 함께 읽습니다. 그때 사람들이 어느 배를 가리켜 어떤 말을 썼는지, 그림만 볼 때 놓치기 쉬운 실마리가 거기 있습니다."],
            spot: "vignettes/turtle-ship_head.png"
          },
          {
            title: "그림에서 *모형으로*",
            plate: 0,
            left: ["옆모습을 그린 종이 한 장을 책상 위에 세워 보세요. 정면에서는 배가 잘 보이지만, 옆으로 돌아가면 종이의 얇은 모서리만 보입니다. 모형을 만드는 사람이 풀어야 할 문제가 바로 거기서 시작됩니다.", "모형에는 그림에 가려 보이지 않는 쪽도 있어야 합니다. 남아 있는 기록을 서로 대조하고, 어느 시기의 모습을 보여 줄지 정해야 하나의 입체가 완성됩니다."],
            right: ["박물관에서 모형 앞에 서면 먼저 윤곽을 보고, 그다음에는 설명판의 연도를 찾아보세요. 모형을 만든 해와 참고한 옛 기록의 해는 서로 다른 질문에 답해 줍니다.", "이제 처음에 그린 연필 스케치를 다시 펴 보세요. 용의 눈 옆에 작은 글씨로 어느 그림을 보고 그렸는지 적으면, 나만의 그림에도 출처가 하나 생깁니다."],
            spot: "vignettes/turtle-ship_head.png"
          }
        ],
        action: "옛 그림 펼치기", back: "복원 그림으로 돌아가기",
        plates: [
          { art: "turtle-ship", caption: "둥근 등을 가진 거북선의 복원 상상도.", alt: "긴 선체와 둥근 덮개를 옆에서 본 거북선 일러스트." },
          { art: "turtle-print", caption: "옛 책에 실린 거북선을 본떠 그린 그림.", alt: "종이에 가는 먹선으로 그린 거북선의 옛 모습." }
        ],
        source: ["국사편찬위원회 우리역사넷", "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300020"]
      },
      {
        id: "jinju-gwigeori", place: "네덜란드 · 17세기", title: "진주 귀걸이의 *사라진 고리*",
        pages: [
          {
            plate: 0,
            left: ["베르메르가 그린 소녀의 귀에는 커다란 진주가 반짝입니다. 귀와 진주 사이를 찬찬히 살펴보세요. 둘을 이어 주는 고리가 보이나요?", "얼굴에서 가장 반짝이는 곳부터 눈으로 짚어 보세요. 눈동자, 아랫입술, 그리고 어두운 목 옆의 귀걸이. 서로 떨어져 있는 밝은 점들이 마치 같은 창에서 들어온 빛을 받은 듯합니다."],
            right: ["화면을 가까이서 보면 귀걸이를 매단 선은 어디에도 없습니다. 그런데도 눈에는 무게가 느껴질 만큼 둥근 장신구가 보입니다.", "손가락으로 귀걸이만 잠깐 가려 보세요. 여전히 소녀는 어깨 너머로 돌아보고 있지만, 방금 전까지 눈길을 붙잡던 작은 무게추 하나가 사라진 느낌이 들지요."],
            reveal: "베르메르는 몇 번의 붓질로 빛을 그렸습니다. 위쪽의 밝은 점과 아래쪽의 부드러운 반사가 모여 둥근 진주처럼 보입니다. 고리까지 그려 넣을 필요가 없었던 셈이지요.",
            spot: "art/pearl-detail.png"
          },
          {
            title: "둥근 물건을 *그리는 법*",
            plate: 1,
            left: ["종이에 둥근 구슬을 그리라면 먼저 동그라미를 그리기 쉽습니다. 베르메르의 귀걸이에서 그런 테두리를 찾아보면 뜻밖에도 연필을 어디서 출발시켜야 할지 막막합니다.", "위쪽에는 작고 밝은 빛이, 아래쪽에는 옷깃의 빛이 돌아온 듯한 부드러운 자국이 있습니다. 그 사이에는 어두운 부분이 그대로 남아 있습니다."],
            right: ["멀리서 볼 때에는 눈이 이 조각들을 이어 하나의 둥근 물건으로 읽습니다. 가까이 다가가면 방금까지 단단해 보이던 귀걸이가 몇 군데의 물감 자국으로 풀어집니다.", "이번에는 그림을 멀찍이 두고 먼저 귀걸이를 찾으세요. 손으로 동그라미를 그린 사람은 아무도 없는데, 보는 사람의 눈은 벌써 원을 완성했습니다."]
          },
          {
            title: "어두운 곳의 *커튼*",
            plate: 0,
            left: ["귀걸이 뒤쪽은 캄캄해서 소녀가 텅 빈 곳에서 고개를 돌린 것처럼 보입니다. 그런데 마우리츠하위스 미술관 연구진이 그림을 조사하자 배경에 숨은 초록색 커튼의 흔적이 드러났습니다.", "물감의 색이 세월을 거치며 달라져 오늘날에는 천의 주름을 맨눈으로 알아보기 어렵습니다. 화가가 처음 칠한 방과 우리가 지금 보는 방 사이에는 그만큼 긴 시간이 흘렀습니다."],
            right: ["밝은 귀걸이는 몇 번의 붓질만으로 우리 눈에 또렷합니다. 반대로 화가가 시간을 들여 그린 커튼은 그림을 정밀하게 조사한 뒤에야 다시 모습을 보였습니다.", "처음 봤던 얼굴로 돌아가 보세요. 파란 천 끝과 어깨 너머의 어둠 사이, 아까는 그냥 지나쳤던 자리를 조금 더 오래 바라보게 됩니다."],
            spot: "art/pearl-detail.png",
            source: ["마우리츠하위스 미술관 연구진", "https://www.mauritshuis.nl/en/press-releases/closer-to-vermeer-and-the-girl"]
          }
        ],
        action: "귀걸이 가까이 보기", back: "초상화 전체 보기",
        plates: [
          { art: "pearl-portrait", caption: "어깨 너머로 돌아보는 소녀.", alt: "파란 터번을 쓰고 어깨 너머를 바라보는 소녀의 초상." },
          { art: "pearl-detail", caption: "귀 아래에서 빛나는 작은 흰 점.", alt: "흰색과 회색 붓자국으로 그린 물방울 모양의 귀걸이." }
        ],
        source: ["마우리츠하위스 미술관", "https://www.mauritshuis.nl/en/our-collection/artworks/670-girl-with-a-pearl-earring/"]
      }
    ]
  },
  ar: {
    name: "العربية", book: "كتاب الفضول", contents: "الفهرس", language: "لغة الكتاب",
    previous: "القصة السابقة", next: "القصة التالية", close: "إغلاق", source: "المصدر", skip: "الانتقال إلى القصة", privacy: "خصوصية تطبيق الرفع",
    about: "أولفيريا كتاب مصوّر يروي حكايات مدهشة عن أشياء نعرفها. لكلّ لغة مجموعتها الخاصة من القصص. المس الرسم لتكتشف بقية الحكاية.",
    stories: [
      {
        id: "kisa-al-haram", place: "مصر · الجيزة", title: "كيف كان يبدو *هرم خوفو؟*",
        pages: [
          {
            plate: 0,
            left: ["تبدو حوافّ الهرم الأكبر اليوم مثل درجات سلّم عملاق. لكن لو وقفت أمامه عندما اكتمل بناؤه، لرأيت خطّاً مستقيماً يمتدّ من الأرض نحو القمّة.", "جرّب أن ترسم جانب الهرم بقلم رصاص من دون أن ترفعه عن الورق. إن اتبعتَ الحجارة التي تراها اليوم، تحرّك رأس القلم قليلاً إلى الجانب عند كلّ درجة. أمّا في الرسم القديم فيكفيك خطّ مائل واحد."],
            right: ["عند قاعدة الهرم بقيت حجارة تختلف عن الكتل الخشنة التي تعلوها. سطحها الخارجي مائل وناعم. تخيّل هذا السطح ممتدّاً على وجه الهرم كلّه.", "اقترب في خيالك من أول صفّ من الحجارة. عند هذه المسافة الصغيرة يبدأ اللغز. كيف استطاع البنّاؤون أن يصنعوا من كتل كثيرة وجهاً واحداً مستوياً؟"],
            reveal: "كان الهرم مكسوّاً بالحجر الجيري الأبيض المصقول. أخفى الكساء الدرجات وأعطى كلّ وجه سطحاً أملس يعكس ضوء الشمس. اختفى معظمه بمرور الزمن، فظهر الحجر الداخلي الذي نراه اليوم.",
            spot: "vignettes/pyramid-f02.png"
          },
          {
            title: "حجر يعبر *النيل*",
            plate: 1,
            left: ["جاء الحجر الجيري الأبيض الذي كسا الهرم من محاجر طرة على الضفة الشرقية للنيل. أمّا موقع البناء ففي الجيزة، على الضفة الغربية. قبل أن يستقرّ الحجر على وجه الهرم، كان عليه أن يقوم برحلة في الماء.", "كان لكلّ كتلة سطح يواجه الخارج. وعندما استقرّت الكتل المتجاورة في أماكنها امتدّ ميل الواحدة في ميل جارتها، حتى صار بالإمكان تتبّع وجه الهرم من أسفله إلى أعلاه."],
            right: ["انظر إلى الخطّ الذي يفصل الوجه المضيء عن الوجه المظلّل في الرسم. ما يبدو من بعيد حافّة واحدة طويلة كان يمرّ، في الحقيقة، على عدد كبير من الحجارة المنفصلة.", "تخيّل الآن شعاع شمس يتحرّك على ذلك السطح المصقول. يمكن لزائر يقف بعيداً أن يرى البياض يلمع من دون أن يميّز حدود أيّ حجر بعينه."],
            spot: "vignettes/pyramid-f04.png",
            source: ["المتاحف الوطنية في اسكتلندا", "https://www.nms.ac.uk/discover-catalogue/casing-stone-from-the-great-pyramid-of-giza"]
          },
          {
            title: "قطعة صغيرة من *منظر هائل*",
            plate: 0,
            left: ["في المتحف الوطني الاسكتلندي بإدنبرة حجر من كساء هرم خوفو. هناك يمكنك أن تنظر إلى قطعة من الواجهة على ارتفاع العين، وأن ترى الميل الذي كان يصعب تمييزه من سفح الهرم.", "يكشف الحجر الواحد شيئاً تخفيه صورة الهرم الكاملة. الوجه الذي كان يستقبل الضوء أملس ومائل، أمّا بقية الكتلة فكانت تجد مكانها إلى جانب الأحجار وفوق الصفّ الذي تحتها."],
            right: ["ارجع إلى صورة الدرجات. لو وضعتَ بإصبعك خطّاً يصل أطرافها، لرسمتَ تقريباً المكان الذي كان يشغله الكساء المفقود. وكلّ درجة بارزة اليوم تحتفظ بجزء من حكاية ذلك السطح.", "هكذا يلتقي منظران تفصل بينهما مسافة بعيدة. أمامنا في الجيزة بناء ضخم فقد معظم ثوبه، وفي إدنبرة قطعة من الثوب نفسه تكاد تكفي وحدها لتخيّل الباقي."],
            spot: "vignettes/pyramid-f09.png",
            source: ["المتاحف الوطنية في اسكتلندا", "https://www.nms.ac.uk/discover-catalogue/casing-stone-from-the-great-pyramid-of-giza"]
          }
        ],
        action: "أعِد الكساء الأبيض", back: "عُد إلى منظر اليوم",
        plates: [
          { diagram: "pyramid", caption: "درجات الحجر التي نراها اليوم.", alt: "رسم توضيحي لهرم خوفو بعد انكشاف طبقات الحجر المتدرّجة." },
          { diagram: "pyramid", caption: "تصوّر للهرم بكسائه الأملس.", alt: "الهرم نفسه وقد غطّت وجوهه طبقة ملساء من الحجر الجيري الفاتح." }
        ],
        source: ["وزارة السياحة والآثار المصرية", "https://egymonuments.gov.eg/ar/monuments/the-great-pyramid"]
      },
      {
        id: "ghuruban-fi-burj", place: "الإمارات · دبي", title: "برج واحد وموعدان *للغروب*",
        pages: [
          {
            plate: 0,
            left: ["تخيّل شخصين في برج خليفة عند المساء. أحدهما قرب الشارع والآخر عند نافذة عالية. تغيب الشمس عن الأوّل بينما لا يزال الثاني يراها.", "لو تكلّما بالهاتف، لاستطاع كلّ منهما أن يصف للآخر لون السماء. وللحظة قصيرة قد يقول أحدهما إنّ الشمس غابت، في حين يقول الآخر إنّه يرى طرفها البرتقالي. وكلا الوصفين صحيح."],
            right: ["ينظر الاثنان نحو الغرب في اللحظة نفسها. ما الذي تغيّر بين النافذتين؟", "راقب الحافّة السفلى لقرص الشمس في الرسم. المسألة كلّها معلّقة بذلك الخيط الرفيع الذي يلتقي عنده لون السماء بلون الأفق."],
            reveal: "كلّما ارتفعت النافذة امتدّ الأفق المرئيّ أبعد، فتظلّ الشمس ظاهرة وقتاً أطول. وفي رمضان عام ٢٠١١ شرحت دائرة الإفتاء في دبي كيف يؤخّر هذا الفرق موعد الإفطار بضع دقائق لبعض سكّان الطوابق العليا.",
            spot: "vignettes/sunset-f04_visitor.png"
          },
          {
            title: "إلى أين يصل *النظر؟*",
            plate: 1,
            left: ["تخيّل بحراً مفتوحاً أمام النافذتين. تنحني الأرض على مهل تحت خطّ البصر. العين القريبة من سطح الماء ترى جزءاً منه، والعين المرتفعة تستطيع أن تنظر أبعد قبل أن يحجب الانحناء ما وراءه.", "لهذا يبتعد الأفق عندما يرتفع موضع عينك. وفي لحظة مسائية بعينها يكون قرص الشمس قد مرّ خلف أفق الشخص الأسفل، بينما يظلّ بعضه فوق أفق الشخص الأعلى."],
            right: ["انظر إلى الرسمين بالتعاقب. الساعة واحدة فيهما. يتغيّر ارتفاع النافذة، فيبقى بين الشمس وخطّ الأفق في إحداهما فسحة صغيرة من الضوء.", "رؤية الشمس تختفي خلف بناية قريبة مسألة أخرى. في هذه التجربة نتخيّل أفقاً مكشوفاً، لكي يكون اختلاف الارتفاع وحده كافياً لتفسير ما رآه الشخصان."],
            spot: "vignettes/sunset-f09_observer.png"
          },
          {
            title: "دقائق على *مائدة الإفطار*",
            plate: 0,
            left: ["في رمضان عام ٢٠١١ أصبح السؤال عن الغروب سؤالاً عملياً لبعض سكّان برج خليفة. عند أيّ لحظة يحين الإفطار إذا كانت الشمس لا تزال مرئية من نافذة السكن؟", "شرحت دائرة الإفتاء في دبي آنذاك توزيعاً للمواقيت بحسب الارتفاع. دار الحديث عن دقيقتين لبعض الطوابق المرتفعة وثلاث دقائق للأعلى منها، بعد الموعد المعتاد عند مستوى المدينة."],
            right: ["دقيقتان مدّة قصيرة على ساعة الحائط. لكنّهما كافيتان ليكون المشهد مختلفاً على جانبي مكالمة هاتفية بين ساكنين في العنوان نفسه.", "عُد إلى النافذة العليا وابحث عن آخر حافّة مضيئة. تلك الشريحة الصغيرة من الشمس هي كلّ ما احتجنا إليه لنقرأ خبراً كاملاً في رسمة نافذة."],
            spot: "vignettes/sunset-f02_dates.png"
          }
        ],
        action: "انظر من النافذة العليا", back: "انظر من مستوى الشارع",
        plates: [
          { diagram: "sunset", caption: "من الأسفل يختفي قرص الشمس خلف الأفق.", alt: "منظر توضيحي من نافذة منخفضة في دبي بعد أن غابت الشمس." },
          { diagram: "sunset", caption: "من الأعلى يبقى طرف الشمس ظاهراً في اللحظة نفسها.", alt: "من النافذة العليا يظهر جزء من الشمس فوق الأفق البعيد." }
        ],
        source: ["وكالة أنباء الإمارات", "https://www.wam.ae/ar/article/hsyp424f-افتاء-دبي-ثلاثة-مواقيت-لإفطار-وسحور-سكان-برج"]
      }
    ]
  },
  tr: {
    name: "Türkçe", book: "Bir merak kitabı", contents: "İçindekiler", language: "Kitabın dili",
    previous: "Önceki", next: "Sonraki öykü", close: "Kapat", source: "Kaynak", skip: "Öyküye geç", privacy: "Uploader gizlilik ilkesi",
    about: "Owlveria, tanıdık şeylerin az bilinen öykülerini anlatan resimli bir kitap. Her dilde başka bir seçki açılır. Resme dokunup öykünün devamını keşfedebilirsin.",
    stories: [
      {
        id: "fincanin-zarfi", place: "Osmanlı kahve kültürü", title: "Kahve fincanı niye *zarfa girer?*",
        pages: [
          {
            plate: 0,
            left: ["Bir kahve tepsisinde, gümüşten yapılmış küçücük bir kap duruyor. Kenarı dantel gibi delikli. İçine kahve döksen doğruca tepsiye akacak.", "Önce kabın gölgesine bak. Aralıklardan ışık geçiyor. Küçük bir ayak, onun üstünde de çiçek yapraklarını andıran kıvrımlar var. Şimdilik ortada bir fincan kahve tutabilecek tek bir kap bile yokmuş gibi görünüyor."],
            right: ["Osmanlı döneminde sofraya bu kapla birlikte bir parça daha gelirdi. Sırrı çözmek için ikisini iç içe koymak yeterli.", "Yanındaki porselen parçanın kenarında ise hiç delik yok. Birini öbürünün yanına koyunca yalnızca iki küçük kap görüyorsun. Asıl ipucu, ağızlarının ve gövdelerinin birbirine uyan ölçüsünde."],
            reveal: "Kulpsuz porselen fincan gümüş kabın içine otururdu. Kahveyi porselen tutar, parmaklar dıştaki gümüşü kavrardı. Bu dış parçanın adı fincan zarfıydı.",
            spot: "vignettes/coffee-p03_cezve.png"
          },
          {
            title: "İki parçadan *bir fincan*",
            plate: 1,
            left: ["Küçük porselen fincanın kulpu yok. İçine sıcak kahve konduğunda parmaklarını nereye yerleştireceksin? Usta, fincanın yanına bir kulp eklemek yerine ona ayrı bir tutacak yapmış.", "Porseleni zarfın içine oturtunca üst kenar metalin biraz üstünde kalıyor. Dudakların porselene değiyor, elin dıştaki kabı kavrıyor. İki malzeme aynı anda iki ayrı iş görüyor."],
            right: ["Zarfın deliklerinden şimdi tepsiyi değil, içindeki fincanı görüyorsun. Bir dakika önce kabı işe yaramazmış gibi gösteren boşluklar, desenin en belirgin parçalarına dönüştü.", "Fincanı yeniden çıkar. Boşluklar kaybolmadı, ama içlerinden görünen renk değişti. Ustanın metale çizdiği desenin bir bölümünü aslında arkadaki porselen tamamlıyordu."],
            spot: "vignettes/coffee-p05_hand_and_cup.png"
          },
          {
            title: "Kahvenin *küçük giysisi*",
            plate: 0,
            left: ["Bugün «zarf» deyince çoğumuz bir mektubu düşünürüz. İçine ince bir kâğıt girer. Fincan zarfının içine de kendisinden farklı malzemeden yapılmış bir şey giriyor. Aynı sözcük iki farklı nesneyi pek güzel anlatıyor.", "Müzelerde zarf tek başına da sergilenebiliyor. Boston’daki Isabella Stewart Gardner Müzesi koleksiyonunda 19. yüzyıldan bir Osmanlı örneği var. Yanına ait olduğu fincanı zihninde yerleştirince biçimi anlam kazanıyor."],
            right: ["Önce alttaki ayağı, sonra genişleyen gövdeyi, en son da üst kenarı izle. Küçücük bir eşya, masada dengede durmakla elde rahat tutulmak arasında nasıl bir şekil bulmuş?", "Tepside kahve çoktan bitmiş olsa da fincanı kaldırıp altındaki parçayı incelemek için güzel bir sebep kalıyor. Bu sofrada son keşif, son yudumdan sonra yapılıyor."],
            spot: "vignettes/coffee-p11_nested.png",
            source: ["Isabella Stewart Gardner Müzesi", "https://www.gardnermuseum.org/experience/collection/11508"]
          }
        ],
        action: "Fincanı yerine koy", back: "Fincanı çıkar",
        plates: [
          { diagram: "coffee", caption: "Delikli zarf ve kulpsuz fincan.", alt: "Çiçek desenli porselen fincan, delikli metal zarfın yanında duruyor." },
          { diagram: "coffee", caption: "Porselen içeride, gümüş elde.", alt: "Porselen fincan zarfın içine oturmuş, ağız kısmı metalin üstünde görünüyor." }
        ],
        source: ["Konya Etnografya Müzesi koleksiyonu üzerine araştırma", "https://dergipark.org.tr/en/download/article-file/3972302"]
      },
      {
        id: "eyfelin-anteni", place: "Paris · 1889", title: "Eyfel Kulesi’ni *radyo nasıl kurtardı?*",
        pages: [
          {
            plate: 0,
            left: ["Eyfel Kulesi 1889’da açıldığında Gustave Eiffel’in araziyi kullanmak için yalnızca yirmi yıllık izni vardı. Paris’in en tanınan yapılarından birinin geleceği henüz belli değildi.", "Ziyaretçiler sergi için geldiklerinde yukarı çıkıp Paris’i seyrediyordu. Sergi kapandıktan sonra ise şehrin karşısında başka bir soru vardı. Bu kadar yüksek bir yapının her gün ne işi olacaktı?"],
            right: ["Yıllar sonra kulenin tepesinden aşağı ince bir tel sarkıyordu. Uzaktan bakınca gözden kaçan bu ayrıntı, kulenin kentte kalmasında büyük rol oynadı.", "Resimde kalın demir ayaklardan başla. Gözün yukarı çıktıkça çizgiler inceliyor. Hikâyenin devamı, tam da kalemin kâğıda neredeyse değmediği yerde saklı."],
            reveal: "Kulenin yüksekliği kablosuz telgraf için çok elverişliydi. Tepesine anten kuruldu, haberleşme denemelerinin menzili giderek arttı. 1910’a gelindiğinde Eiffel’in imtiyazı yetmiş yıl uzatılmıştı.",
            spot: "vignettes/eiffel-c_hat.png"
          },
          {
            title: "Paris’in üzerinden *bir mesaj*",
            plate: 1,
            left: ["5 Kasım 1898’de Eugène Ducretet, Eyfel Kulesi ile Panthéon arasında kablosuz bir bağlantı kurdu. İki yapı arasındaki mesafe yaklaşık dört kilometreydi. Gönderilen mesaj Mors işaretlerinden oluşuyordu.", "Kısa ve uzun işaretler bir araya gelince bir harf okunabiliyordu. Bir Parisli o sırada aşağıdaki sokaktan geçseydi, başının üzerinden geçen mesajı göremezdi."],
            right: ["Çizimde antenin telini takip et. Tel kulenin parçasıydı. Karşıdaki yapıya kadar dört kilometre boyunca çekilmiş bir tel aramana gerek yok. Denemenin heyecanı tam da bu aralığın havadan aşılmasındaydı.", "Bir sergi ziyaretçisinin manzaraya bakmak için çıktığı yükseklik, şimdi bir işareti uzaktan duyurmak için kullanılıyordu."],
            spot: "vignettes/eiffel-c_pigeon.png"
          },
          {
            title: "Kulenin *ikinci işi*",
            plate: 0,
            left: ["Gustave Eiffel yapısının bir araştırma yeri olarak kullanılmasını destekledi. Kablosuz telgraf denemeleri ilerledikçe tepeden gönderilen işaretler giderek daha uzak mesafelerde alınabiliyordu.", "Böylece kulenin geleceğini tartışanların önünde yeni bir gerekçe vardı. 1889’daki sergi çoktan bitmişti ama haberleşme işini ertesi gün de birinin yapması gerekecekti."],
            right: ["1910’da Eiffel’in imtiyazı yetmiş yıl uzatıldı. Baştaki yirmi yıllık izinle yan yana düşününce, ince bir telin bir yapının takvimini nasıl değiştirdiği anlaşılıyor.", "Kuleyi yeniden çizerken bu kez en ince çizgiye biraz yer bırak. Paris’in simgesini uzaktan tanımak için ona ihtiyacın olmayabilir. Kulenin neden hâlâ orada olduğunu anlatırken ise çok işe yarar."],
            spot: "vignettes/eiffel-f01.png"
          }
        ],
        action: "Anteni bul", back: "Kuleye geri dön",
        plates: [
          { art: "eiffel-tower", caption: "Kulenin ayaklarından tepeye bakış.", alt: "Aşağıdan görülen, sarı kalemle çizilmiş Eyfel Kulesi." },
          { art: "eiffel-wire", caption: "Kulenin tepesinden uzanan anten telleri.", alt: "Eyfel Kulesi ile yere uzanan anten tellerini gösteren çizim." }
        ],
        source: ["Eyfel Kulesi", "https://www.toureiffel.paris/en/news/130-years/why-was-eiffel-tower-kept"]
      }
    ]
  },
  id: {
    name: "Bahasa Indonesia", book: "Buku serba ingin tahu", contents: "Daftar isi", language: "Bahasa buku",
    previous: "Sebelumnya", next: "Cerita berikutnya", close: "Tutup", source: "Sumber", skip: "Langsung ke cerita", privacy: "Privasi Uploader",
    about: "Owlveria adalah buku bergambar tentang sisi tak terduga dari hal-hal yang kita kenal. Setiap bahasa membuka kumpulan cerita tersendiri. Sentuh gambarnya untuk membaca kelanjutannya.",
    stories: [
      {
        id: "danau-di-atas-danau", place: "Sumatra Utara · Samosir", title: "Ada danau *di atas danau*",
        pages: [
          {
            plate: 0,
            left: ["Bayangkan kamu menyeberangi Danau Toba dan turun di Pulau Samosir. Kamu meninggalkan tepian, menyusuri jalan menanjak, lalu bertemu air danau lagi.", "Dari perahu, batasnya mudah dibaca. Ada air di bawah perahu dan ada daratan tempat kamu akan turun. Sesudah naik ke dataran tinggi, aturan sederhana itu perlu satu baris tambahan."],
            right: ["Kamu masih berada di pulau yang sama. Coba lihat lebih dekat bagian tengah gambar. Danau apa yang ada di dataran tinggi itu?", "Coba ikuti garis pantai dengan ujung jari. Saat jari mengelilingi pulau, ada setitik biru yang belum tersentuh sama sekali. Titik kecil itulah tujuan perjalanan kita."],
            reveal: "Namanya Danau Sidihoni. Danau kecil ini berada di dataran tinggi Samosir, sedangkan Samosir sendiri berada di Danau Toba. Itulah asal julukan “danau di atas danau”.",
            spot: "vignettes/lake-f09.png"
          },
          {
            title: "Dua tepi *yang berbeda*",
            plate: 1,
            left: ["Dari tepi Sidihoni kamu bisa memandang air dan melihat daratan di seberang. Pemandangannya terasa seperti tepi danau biasa. Air Danau Toba yang jauh lebih luas tidak harus ikut terlihat.", "Sekarang bayangkan berjalan menjauhi Sidihoni menuju tempat perahu tadi merapat. Yang ditinggalkan pertama adalah danau kecil. Yang ditemui kemudian adalah danau besar, setelah kamu melintasi daratan Samosir."],
            right: ["Di peta, kedua tepian itu gampang tertukar kalau semua garis diberi warna biru. Bayangkan mewarnai air lebih dulu, lalu sisakan warna tanah untuk pulau. Kini kamu perlu mengambil pensil biru sekali lagi.", "Sebutan “danau di atas danau” menjadi masuk akal ketika perjalanan itu dibaca dari samping juga. Sidihoni berada di dataran tinggi pulau, di atas permukaan air Toba."],
            spot: "vignettes/lake-f03.png"
          },
          {
            title: "Cekungan yang *menjadi danau*",
            plate: 0,
            left: ["Danau Toba menempati sebuah kaldera, cekungan besar yang terbentuk dalam sejarah letusan gunung api di Sumatra. Air mengisi cekungan itu. Bagian yang terangkat di tengahnya membentuk Pulau Samosir.", "Dilihat dari ketinggian, pulau itu seperti bidang tanah yang diletakkan di tengah air. Riwayat bentang alamnya jauh lebih menarik. Pulau dan cekungan yang mengelilinginya merupakan bagian dari cerita geologi yang sama."],
            right: ["Pada gambar kecil, satu guratan pensil cukup untuk menyeberangi danau. Di lapangan, perjalanan itu membawa kita dari perahu ke jalan yang menanjak, lalu ke sebuah tepian yang sama sekali berbeda.", "Kalau seseorang meminta kamu menunjukkan danau di gambar ini, sekarang kamu punya pertanyaan balasan yang bagus. Yang ingin ditunjuk danau di sekeliling pulau atau danau di atasnya?"],
            spot: "vignettes/lake-f09.png",
            source: ["UNESCO", "https://www.unesco.org/en/iggp/toba-caldera-unesco-global-geopark"]
          }
        ],
        action: "Perbesar Pulau Samosir", back: "Lihat Danau Toba lagi",
        plates: [
          { diagram: "lake", caption: "Letak Samosir di Danau Toba, digambar secara skematis.", alt: "Sketsa Danau Toba dengan Pulau Samosir di tengahnya." },
          { diagram: "lake", caption: "Lebih dekat, tampak Danau Sidihoni di atas pulau.", alt: "Detail skematis Samosir memperlihatkan danau kecil di bagian dalam pulau." }
        ],
        source: ["Indonesia Travel", "https://www.indonesia.travel/id/id/travel-ideas/marine/7-surga-tersembunyi-di-sekitar-danau-toba"]
      },
      {
        id: "penyair-di-atas-pintu", place: "Paris · 1880", title: "Apa yang dipandangi *Sang Pemikir?*",
        pages: [
          {
            plate: 0,
            left: ["Laki-laki perunggu itu menumpukan dagu di tangannya. Kalau patungnya berdiri sendiri di taman, ia seolah sedang memandangi tanah. Padahal Rodin mula-mula memberinya pemandangan yang lain.", "Perhatikan dagunya sebentar, lalu ikuti garis lengan ke bawah. Seluruh tubuh condong ke depan seolah ada sesuatu yang menuntut perhatiannya. Apa yang akan berubah kalau tanah di bawah kakinya kita ganti dengan sebuah cerita?"],
            right: ["Patung kecil itu dirancang untuk duduk tinggi di atas sebuah pintu besar. Coba mundur selangkah agar seluruh pintunya terlihat.", "Pada gambar dekat, tepi halaman memotong dunia di sekitarnya. Mata kita berhenti pada wajah dan tangan. Untuk melihat apa yang mungkin dipandangi sosok itu, kita perlu memperlebar gambar."],
            reveal: "Di bawahnya terbentang Gerbang Neraka, karya Rodin yang terinspirasi puisi Dante. Mula-mula patung itu bernama Sang Penyair. Sosoknya menggambarkan Dante merenungi dunia yang ia tulis.",
            spot: "vignettes/thinker-man_look.png"
          },
          {
            title: "Kursi untuk *seorang penyair*",
            plate: 1,
            left: ["Pada 1880 Rodin merancang sosok ini sebagai bagian dari Gerbang Neraka. Tempat duduknya tinggi di atas daun pintu, di atas kerumunan figur yang memenuhi gerbang. Ketika itu tingginya sekitar tujuh puluh sentimeter.", "Nama pertamanya Sang Penyair. Ia menggambarkan Dante, pengarang puisi yang mengilhami gerbang tersebut. Rodin memberi sang penulis tempat untuk merenungi dunia yang lahir dari kata-katanya sendiri."],
            right: ["Angkat pandangan dari bagian bawah gerbang. Ada begitu banyak tubuh di sana sehingga mata perlu waktu untuk menemukan satu sosok yang diam. Sesampainya di atas, kamu hampir ingin ikut duduk dan memandang ke bawah.", "Ubah lagi gambarnya menjadi wajah dari dekat. Sikap duduknya tetap sama. Yang berubah sekarang adalah apa yang kamu bayangkan berada di luar tepi halaman."],
            spot: "vignettes/thinker-arm_scroll.png"
          },
          {
            title: "Patung itu *turun dari pintu*",
            plate: 0,
            left: ["Pada 1888 sosok tersebut dipamerkan sebagai karya tersendiri. Versinya di gerbang tetap duduk di tempat semula. Satu pose kini bisa dilihat dalam dua keadaan yang sangat berbeda.", "Pada 1904 dibuat versi yang diperbesar. Tubuh yang dahulu perlu dicari di antara banyak figur di atas gerbang kini bisa menjadi pusat perhatian sebuah ruangan atau taman."],
            right: ["Coba buat bingkai kecil dari jari dan ibu jari. Bingkai satu wajah saja, lalu buka tangan sampai sosok-sosok di sekelilingnya ikut terlihat. Kamu baru saja mengubah pertanyaan yang diajukan oleh patung itu.", "Dari dekat kita bertanya apa yang sedang ia pikirkan. Dari jauh kita bisa menelusuri gerbang, melihat ke mana kepalanya menunduk, lalu mencari jawabannya bersama sang penyair."],
            spot: "vignettes/thinker-man_look.png"
          }
        ],
        action: "Lihat seluruh pintu", back: "Dekati sang pemikir",
        plates: [
          { art: "thinker", caption: "Dagu di tangan, pandangan mengarah ke bawah.", alt: "Wajah Sang Pemikir bertumpu pada tangannya dalam gambar pensil." },
          { art: "thinker-door", caption: "Sang Penyair duduk di atas Gerbang Neraka.", alt: "Figur Sang Pemikir di bagian atas pintu besar penuh tokoh dari kisah Dante." }
        ],
        source: ["Musée Rodin", "https://www.musee-rodin.fr/en/musee/collections/oeuvres/thinker"]
      }
    ]
  }
};
