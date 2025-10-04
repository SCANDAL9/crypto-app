import { frequencyAnalysis } from '../src/ciphers_library/analisisFrecuencia.js';



console.log('Test 1: Texto con repeticiones');
const test1 = `j $ o j r o c f h r ! j r m h # j t o l d c h $ r ! j # g j $ o d l t r m @ l d 
l # j t o j r l @ ) g t l $ r m h $ l $ i g j r @ l r $ h @ j ! l ! r ! j @ r j 
# f d j $ l d c h r j $ r l q $ h @ g o l # j t o j r d j l @ r i g j r l i g j 
@ r i g j r t h r j $ r i g j r t g t m l r % g j r h r i g j r t g t m l r i g 
c j d j r $ j d @ h r a l # l $ r j t o j t ! j d l r t l ! l r ! j r @ h r i g 
j r @ j r o h m l r k c k c d r l @ r j # f d j $ l d c h r i g j r j @ r j t o 
j t ! c # c j t o h r f h f g @ l d r l r f j $ l d r ! j r @ h $ r c t m d j c 
q @ j $ r l ! j @ l t o h $ r o j m t h @ h ) c m h $ r j t r @ h $ r f d h m j 
$ h $ r ! j r c t % h d # l m c h t r b r j ! g m l m c h t r $ c ) g j r m h t 
$ c ! j d l t ! h r g t l r d j l @ c ! l ! r ! j r m h t m j f o h $ r f h @ l 
d c p l ! h $ r b r ! h ) # l o c m h $ r d c m h $ f h q d j $ r j n f @ h o l 
! h d j $ j n f @ h o l ! h $ r h f d j $ h d j $ h f d c # c ! h $ r j o m r i 
g j r j n c $ o j r g t r ! j $ m h t h m c # c j t o h r l o d j k c ! h r ! j 
r m h t m j f o h $ r b r g t r g $ h r f j @ c ) d h $ h r ! j r m h t $ c ) t 
l $ r ! j r m h # q l o j r f l d l r l o l m l d r m g l @ i g c j d r f j t $ 
l # c j t o h r i g j r f g j ! l r j t o j t ! j d $ j r m h # h r # g b r m h 
t $ j d k l ! h d r i g j r j n c $ o j r @ l $ o c # h $ l # j t o j r g t r $ 
h % o ^ l d j r # j t o l @ r j i g c k h m l ! h r i g j r t h $ r j $ r o d l 
t $ # c o c ! h r ! j r ) j t j d l m c h t r j t r ) j t j d l m c h t r b r i 
g j r t h $ r c # f c ! j r f d j o j t ! j d r b r l # q c m c h t l d r # l $ 
r ! j r l i g j @ @ h r i g j r j $ o l r l @ r l @ m l t m j r ! j @ r f d h # 
j ! c h ! j o d l $ r ! j r @ l r o j # l o c m l r ! j @ r j # f d j $ l d c h 
r b h r t h r f d j o j t ! h r $ h $ o j t j d r t c t ) g t l r f @ l o l % h 
d # l r f h @ c o c m l r h r m h t $ c ! j d l m c h t r $ h m c h @ h ) c m l 
r t h r # j r c t o j d j $ l r ! j o j d # c t l d r b r m c o h r g t h r ! j 
r @ h $ r m h # j t o l d c h $ r $ c r @ l r m h t m j f m c h t r l t o d h f 
h @ h ) c m l r ! j @ r * h # g $ r j m h t h # c m g $ r m h # h r q l $ j r ! 
j r g t r $ c $ o j # l r j m h t h # c m h r m l f c o l @ c $ o l r i g j ! h 
r ! j $ % l $ l ! l r * l m j r r l t h $ ! j o d l $ r ! j r @ l r o j # l o c 
m l r ! j @ r j # f d j $ l d c h r b h r f j d $ c ) h r d j $ m l o l d r g t 
r j $ i g j # l r # j t o l @ r i g j r # j r f l d j m j r % l m o h d r % g t 
! l # j t o l @ r ! j r ! j $ l d d h @ @ h r * g # l t h ! j $ ! j r # c r f g 
t o h r ! j r k c $ o l r j @ r j # f d j $ l d c h r h r j @ r l $ f c d l t o 
j r l r $ j d @ h r ! j $ j l r g t r m l # q c h r m g l @ c o l o c k h r ! j 
r j $ o l ! h r i g c j d j r $ j d r l @ ) h r # l $ r ! j r l i g j @ @ h r i 
g j r @ j r h % d j m j r j @ r f d h # j ! c h r l $ f c d l r l r m h t $ o d 
g c d r l @ ) h r i g j r t h r j n c $ o j r d j $ f j o l r g t l r k c $ c h 
t r j a j m g o l r j @ r ! j d j m * h r g t c k j d $ l @ r i g j r o j t j # 
h $ r ! j r f j d $ j ) g c d r g t r $ g j t h r j $ o j r t h r j $ r g t r f 
d h m j $ h r $ j t m c @ @ h r b r f h d r j $ h r ! c $ o c t ) g j r l r @ h 
$ r * h # q d j $ r j @ r j # f d j $ l d c h r t h r $ h @ h r ! j $ j l r o d 
l t $ c o l d r j @ r m l # c t h r o l # q c j t r j $ o l r ! c $ f g j $ o h 
r l r o h # l d r @ h $ r d c j $ ) h $ r i g j r j $ o j r f @ l t o j l r b r 
l r f l ) l d r j @ r m h $ o h r i g j r j $ o j r j n c ) j t g j $ o d l $ r 
$ h m c j ! l ! j $ r t j m j $ c o l t r # l $ r * h # q d j $ r i g j r f c j 
t $ j t r o j # f d l t h r j t r m h # h r ) j t j d l d r o d l q l a h r b r 
t h r g t c m l # j t o j r j t r m h # h r q g $ m l d @ h r t g j $ o d l $ r 
$ h m c j ! l ! j $ r t j m j $ c o l t r ! j r # l $ r * h # q d j $ r i g j r 
! j $ j j t r ! j $ l d d h @ @ l d r g t l r j # f d j $ l r b r t h r $ h @ h 
r q g $ m l d r g t l r i g j r @ l $ r m h q c a j r t g j $ o d l $ r $ h m c 
j ! l ! j $ r t j m j $ c o l t r # l $ r * h # q d j $ r i g j r l # q c m c h 
t j t r d c i g j p l r b r # j t h $ r ! j r l i g j @ @ h $ r i g j r l ! i g 
c j d j t r j n f j d o c m c l r j t r @ l r @ g m * l r m h t o d l r @ l r f 
h q d j p l t l ! l r ! j r j $ o h r # j r f l d j m j r h t o h @ h ) c m l # 
j t o j r # l @ h r j $ r * h d l r ! j r @ @ l # l d r l r @ l $ r m h $ l $ r 
f h d r $ g r t h # q d j r @ l r f h q d j p l r t h r j $ r q g j t l r @ l r 
d c i g j p l r t h r j $ r # l @ l r @ l r f h q d j p l r t h r j $ r g t l r 
q j t ! c m c h t r b r t l ! l r q g j t h r f j d $ c ) g j t r $ g $ r ! j % 
j t $ h d j $ r ! c $ % d l p l ! h $ r ! j r o j h d c m h $ r ! j r @ l r $ h 
@ c ! l d c ! l ! r h r ! j @ r # g t ! h r % d l o j d t h r t h r ! j q j r m 
h t $ c ! j d l d $ j r g t r l ! l @ c ! r ! j r @ l $ r d j c k c t ! c m l m 
c h t j $ r $ h m c l @ j $ r i g c j t r j t m g j t o d l r j $ j t m c l @ # 
j t o j r # l @ h r j @ r ! j $ l d d h @ @ h r j m h t h # c m h r c t ! c k c 
! g l @ o l # f h m h r ! j q j r % l $ o c ! c l d t h $ r j @ r * j m * h r i 
g j r j @ r f d h ) d j $ h r j m h t h # c m h r c t ! c k c ! g l @ r f d j $ 
j t o j r # j a h d j $ r ! j d d h o j d h $ r f l d l r l i g j @ r i g j r ! 
j $ j j r j $ m l f l d r ! j r @ l $ r # c @ r b r g t r o d l # f l $ r i g j 
r f d j $ j t o l r j @ r g t c k j d $ h r ! j @ r l $ l @ l d c l ! h r h r l 
m l $ h r o l # q c j t r ! j q j # h $ r j t o j t ! j d r i g j r i g c j t r 
k c k j r g t l r k c ! l r j t o j d l r ! j f j t ! c j t ! h r ! j r $ g r $ 
l @ l d c h r o c j t j r # j a h d j $ r f j d $ f j m o c k l $ r ! j r q c j 
t j $ o l d r i g j r l i g j @ r i g j r c t o j t o l r ! j f j t ! j d r ! j 
r $ g $ r j # f d j t ! c # c j t o h $ r i g j r @ j r l ) d l ! l d c l r # l 
$ r l r g t r f l ! d j r i g j r $ g r * c a h r l $ f c d j r l r $ j d r o h 
! l r $ g r k c ! l r g t r l $ l @ l d c l ! h r h r g t r j # f d j $ l d c h 
j t r j @ r l d o c m g @ h r m h # j t o h r i g j r j @ r j # f d j $ l d c h 
r j $ m h ) j r @ l r @ c q j d o l ! r j t r @ g ) l d r ! j r @ l r $ j ) g d 
c ! l ! r l r j $ o h r j @ r m h # j t o l d c h r m d c o c m h r d j $ f h t 
! j r b r m c o h r j $ r ! j m c d r @ l r @ c q j d o l ! r j $ r g t r ! j d 
j m * h r c t t l o h r ! j r o h ! h $ r @ h $ r * h # q d j $ r h r f h d r j 
@ r m h t o d l d c h r d j $ f h t ! j r l r g t l r f h $ c m c h t r ! j o j 
d # c t l ! l r f h d r @ l $ r d j @ l m c h t j $ r ! j r f d h ! g m m c h t 
j t r d j l @ c ! l ! r @ l r @ c q j d o l ! r j $ r g t r ! j d j m * h r c t 
t l o h r i g j r t h r o h ! h $ r @ h $ r * h # q d j $ r j a j d m j t r j $ 
h r $ c r f h d r k h @ g t o l ! r f d h f c l r @ h r i g j r ! j r * j m * h 
r t h r @ j $ r i g c o l r j @ r @ c q d j r l @ q j ! d c h r i g c j t r f g 
j ! j r l % c d # l d r i g j r g t r l $ l @ l d c l ! h r j $ o l r j a j d m 
c j t ! h r j t r # l d ) j t j $ r l # f @ c h $ r $ g r ! j d j m * h r ! j r 
@ c q j d o l ! r g t r l $ l @ l d c l ! h r j $ r g t r ! j f j t ! c j t o j 
r k j l $ j r ! j $ ! j r @ l r f h $ c m c h t r i g j r $ j r @ h r k j l r l 
* h d l r q c j t r $ c r ! j $ j l r ! j a l d r ! j r $ j d r g t l r l $ l @ 
l d c l ! h r b r m h t k j d o c d $ j r j t r g t r m g j t o l r f d h f c l 
r g t r j # f d j $ l d c h r h r g t r c t k j d $ c h t c $ o l r j $ o l r l 
$ f c d l t ! h r l r ) d l ! h $ r # l b h d j $ r ! j r @ c q j d o l ! r f h 
d i g j r f d h q l q @ j # j t o j r j t o d j r j $ o h $ r j $ o l ! h $ r l 
@ m l t m j r o l # q c j t r # l b h d r m h # h ! c ! l ! r j m h t h # c m l 
r @ h r i g j r ! j r * j m * h r l g # j t o l r o l # q c j t r $ g r ) d l ! 
h r ! j r @ c q j d o l ! r f h d i g j r o l # q c j t r j $ r q g j t h r f d 
j ) g t o l d $ j r i g j r o l t o l r @ c q j d o l ! r h o h d ) l r @ l r f 
h q d j p l r @ l r j $ m l $ j p r b r @ l r m h t o j t m c h t $ c t r j # q 
l d ) h r @ l r d j l @ c ! l ! r j $ r m h t o g t ! j t o j r $ h t r # g m * 
h $ r # l $ r l i g j @ @ h $ r i g j r f d c k c @ j ) c l t r @ l r $ j ) g d 
c ! l ! r ! j r g t r j # f @ j h r i g j r @ l r @ c q j d o l ! r i g j r h % 
d j m j t r j $ o l ! h $ r l @ o j d t l o c k h $ b r j $ r i g j r @ l r # l 
b h d c l r ! j r @ l $ r f j d $ h t l $ r m l # c t l t r f h d r @ l r k c ! 
l r m h t r g t r $ h % o ^ l d j r # j t o l @ r j i g c k h m l ! h r g t h r 
i g j r * j d j ! l # h $ r ! j r ) j t j d l m c h t r j t r ) j t j d l m c h 
t r q c j t r @ h r ! c m j r j @ r f d j m @ l d h r l g o h d r ! j @ r @ c q 
d h r f l ! d j r d c m h r f l ! d j r f h q d j r j @ r $ j t h d r d h q j d 
o r ( c b h $ l ( c r l r f h m h $ r t c t h $ r $ j r @ j $ r ! j $ l d d h @ 
@ l r c t o j @ c ) j t m c l r % c t l t m c j d l r l r f h m h $ r $ j r @ j 
$ r j t $ j t l r m h # h r ! j q j t r o d l o l d r b r # l t j a l d r j @ r 
! c t j d h r $ j r * l m j t r j $ % g j d p h $ r j t h d # j $ r f h d r % h 
d # l d r l r @ l $ r t g j k l $ r ) j t j d l m c h t j $ r m h t r g t l r # 
c $ m j @ l t j l r l $ h # q d h $ l r ! j r m h t h m c # c j t o h $ r * g # 
l t h $ r f j d h r @ g j ) h r g t l r ) d l t r f l d o j r ! j r j $ o h $ r 
t c t h $ r k c k j t r j t o d j r @ l $ r @ c # c o l m c h t j $ r b r f d c 
k l m c h t j $ r i g j r ! c m o l r @ l r f h q d j p l r ) d l t ! j $ r m c 
g ! l ! j $ r ! j r t g j $ o d l r @ l o c t h l # j d c m l r f d h % g t ! l 
r m h # h r @ h r ! c d c l r * g ) h r m * l k j p r t h $ r # g j $ o d l t r 
c t ) j t c j d h $ r b r ! h m o h d j $ r o d l q l a l t ! h r j t r @ l r m 
h t ! g m m c h t r ! j r g t r o l n c r h r * l m c j t ! h r % c @ l $ r c t 
o j d # c t l q @ j $ r f l d l r m h t $ j ) g c d r g t l r k c $ l r l r t h 
d o j l # j d c m l `;
const result2 = frequencyAnalysis(test1);
console.log('Texto:', test1);
console.log('Total de caracteres:', result2.total);
console.log('Frecuencias:');
result2.frequencies.forEach(item => {
  console.log(`  '${item.ch}': ${item.percentage}`);
});
console.log();

