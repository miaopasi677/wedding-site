export function createCameraPath(THREE){

return new THREE.CatmullRomCurve3([
new THREE.Vector3(0,0,10),
new THREE.Vector3(4,2,6),
new THREE.Vector3(-4,1,4),
new THREE.Vector3(0,0,1)
]);

}