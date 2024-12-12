const grid = document.querySelector(".grid");
const images = grid.querySelectorAll("img");

// Карта направлений для каждой позиции относительно курсора
const directionMap = {
    "up-left": "up-left.jpg",
    "up": "up.jpg",
    "up-right": "up-right.jpg",
    "left": "left.jpg",
    "center": "center.jpg",
    "right": "right.jpg",
    "down-left": "down-left.jpg",
    "down": "down.jpg",
    "down-right": "down-right.jpg"
};

// Функция для обновления изображений всех ячеек
function updateImages(targetPosition) {
    images.forEach((img) => {
        const imgPosition = img.getAttribute("data-position").split("-");
        const [row, col] = imgPosition.map(Number);
        const [targetRow, targetCol] = targetPosition.map(Number);

        const diffRow = targetRow - row;
        const diffCol = targetCol - col;

        // Вычисляем направление для текущей картинки
        let direction = "center"; // По умолчанию центральная
        if (diffRow < 0 && diffCol < 0) direction = "up-left";
        else if (diffRow < 0 && diffCol === 0) direction = "up";
        else if (diffRow < 0 && diffCol > 0) direction = "up-right";
        else if (diffRow === 0 && diffCol < 0) direction = "left";
        else if (diffRow === 0 && diffCol > 0) direction = "right";
        else if (diffRow > 0 && diffCol < 0) direction = "down-left";
        else if (diffRow > 0 && diffCol === 0) direction = "down";
        else if (diffRow > 0 && diffCol > 0) direction = "down-right";

        // Обновляем картинку в зависимости от направления
        img.src = directionMap[direction] || "center.jpg";
    });
}

// Добавляем обработчики событий на каждую ячейку
images.forEach((img) => {
    img.addEventListener("mouseenter", (e) => {
        const position = e.target.getAttribute("data-position").split("-");
        updateImages(position);
    });

    img.addEventListener("mouseleave", () => {
        // Сбрасываем все изображения обратно на центральное
        images.forEach((img) => (img.src = "center.jpg"));
    });
});
