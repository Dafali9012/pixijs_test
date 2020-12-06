export default function hitTest(object_1, object_2) {
    if((object_1.x + object_1.width > object_2.x || object_1.x < object_2.x + object_2.width) &&
        (object_1.y + object_1.height > object_2.y || object_1.y < object_2.y + object_2.height))
        return true;
    return false;
}