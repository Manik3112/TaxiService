
// function* gen() {
// 		yield res = setTimeout(()=>{
// 			return (10+2)
// 		},0)
// 		yield console.log(res)
// 	}
// 	var genObj = gen()
// 	genObj.next()
// 	// console.log(x)

function h1(){
	return function(){
		console.log(1)
	}
}
let x = h1()
console.log(x)
// h1(cb,()=>{
// 	console.log('h1')
// })