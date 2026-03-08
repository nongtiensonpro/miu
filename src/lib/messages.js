/**
 * 50 diverse 8/3 Women's Day win messages.
 * Returns a random message that wasn't shown recently.
 */

export const WIN_MESSAGES = [
    // Ngọt ngào
    { emoji: '🌸', title: 'Hạnh phúc mỗi ngày!', body: 'Chúc bạn luôn tươi cười như những bông hoa mùa xuân.' },
    { emoji: '💐', title: 'Bông hoa đặc biệt!', body: 'Trong vườn hoa cuộc sống, bạn là đóa đẹp nhất.' },
    { emoji: '🌹', title: 'Trái tim ấm áp!', body: 'Cảm ơn bạn đã mang yêu thương đến mọi nơi bạn bước qua.' },
    { emoji: '✨', title: 'Tỏa sáng nhé!', body: 'Bạn có ánh sáng riêng — đừng bao giờ để ai tắt đi.' },
    { emoji: '🦋', title: 'Bay cao nhé!', body: 'Như cánh bướm tự do, chúc bạn chạm tới mọi ước mơ.' },
    { emoji: '🎀', title: 'Ngày đặc biệt!', body: 'Hôm nay và mỗi ngày — bạn đều xứng đáng được yêu thương.' },
    { emoji: '🌟', title: 'Ngôi sao rực rỡ!', body: 'Bạn sáng hơn cả bầu trời đêm trong mắt mọi người.' },
    { emoji: '🍀', title: 'May mắn mỗi ngày!', body: 'Chúc bạn luôn gặp điều tốt đẹp trên mọi nẻo đường.' },
    { emoji: '🌈', title: 'Rực rỡ như cầu vồng!', body: 'Sau mưa là nắng — bạn chính là ánh nắng ấy.' },
    { emoji: '💫', title: 'Lung linh như sao!', body: 'Mỗi ngày bạn sống là một ngày vũ trụ trở nên đẹp hơn.' },

    // Hài hước nhẹ nhàng
    { emoji: '😻', title: 'Siêu dễ thương!', body: 'Cảnh báo: Bạn quá dễ thương có thể gây chóng mặt! 😄' },
    { emoji: '🐱', title: 'Mèo tặng tim!', body: 'Chú mèo nói: "Mèo mèo! Bạn là người tuyệt nhất thế giới!"' },
    { emoji: '🎪', title: 'Ngày hội của bạn!', body: 'Hôm nay cả vũ trụ đang bày tiệc để chúc mừng bạn đó!' },
    { emoji: '🎠', title: 'Vui vẻ bất tận!', body: 'Chúc bạn có thật nhiều khoảnh khắc đáng nhớ hôm nay.' },
    { emoji: '🍭', title: 'Ngọt ngào như kẹo!', body: 'Nhìn bạn thôi đã thấy ngọt miệng rồi 🍬 Happy 8/3!' },

    // Truyền cảm hứng
    { emoji: '💪', title: 'Mạnh mẽ & Xinh đẹp!', body: 'Bạn mạnh hơn bạn nghĩ, xinh hơn bạn thấy và tuyệt vời hơn bạn biết.' },
    { emoji: '🚀', title: 'Không giới hạn!', body: 'Bầu trời không phải giới hạn — nó chỉ là điểm khởi đầu của bạn.' },
    { emoji: '🏆', title: 'Nhà vô địch!', body: 'Trong trái tim mọi người, bạn luôn giành ngôi quán quân.' },
    { emoji: '🌊', title: 'Vượt sóng gió!', body: 'Như biển cả mênh mông, không gì có thể ngăn cản bạn tiến lên.' },
    { emoji: '⭐', title: 'Tinh tú giữa đời!', body: 'Giữa hàng tỉ ngôi sao, bạn vẫn là ngôi sao sáng nhất.' },
    { emoji: '🔥', title: 'Rực rỡ mỗi ngày!', body: 'Ngọn lửa trong bạn không bao giờ tắt — cháy sáng nhé!' },
    { emoji: '🌺', title: 'Nở rộ mỗi ngày!', body: 'Như hoa mãn khai, chúc bạn mỗi ngày đều tươi thắm hơn.' },
    { emoji: '💎', title: 'Viên kim cương!', body: 'Dù áp lực đến đâu, bạn luôn tỏa sáng như kim cương.' },
    { emoji: '🦁', title: 'Dũng cảm & Kiêu hãnh!', body: 'Bạn có trái tim sư tử — dũng cảm và đầy yêu thương.' },
    { emoji: '🌙', title: 'Ánh trăng dịu dàng!', body: 'Khi thế giới tối tăm, bạn là ánh trăng soi sáng tất cả.' },

    // Gia đình & tình thân
    { emoji: '🏡', title: 'Mái ấm hạnh phúc!', body: 'Nơi nào có bạn, nơi ấy là ngôi nhà ấm áp nhất.' },
    { emoji: '👨‍👩‍👧', title: 'Người mẹ tuyệt vời!', body: 'Công ơn mẹ như biển Thái Bình — không đong đếm được.' },
    { emoji: '💝', title: 'Yêu thương vô bờ!', body: 'Tình yêu bạn dành cho mọi người là món quà vô giá nhất.' },
    { emoji: '🤝', title: 'Người bạn đồng hành!', body: 'Cảm ơn bạn luôn ở đây, luôn lắng nghe và luôn thấu hiểu.' },
    { emoji: '🫂', title: 'Ôm thật chặt!', body: 'Dù xa hay gần, tình cảm bạn dành cho mọi người không bao giờ phai.' },

    // Thơ mộng
    { emoji: '🌌', title: 'Giữa dải ngân hà!', body: 'Nếu tôi có thể hái một ngôi sao, tôi sẽ tặng nó cho bạn.' },
    { emoji: '🎵', title: 'Giai điệu cuộc sống!', body: 'Bạn là nốt nhạc đẹp nhất trong bản nhạc cuộc đời này.' },
    { emoji: '📖', title: 'Câu chuyện tuyệt đẹp!', body: 'Cuốn sách cuộc đời bạn mỗi trang đều là phép màu.' },
    { emoji: '🕊️', title: 'Bình yên & Tự do!', body: 'Chúc bạn tâm hồn nhẹ nhàng như cánh chim bồ câu.' },
    { emoji: '🌿', title: 'Xanh mát cuộc sống!', body: 'Như cây cỏ sau mưa, chúc bạn luôn tươi mới và đầy sức sống.' },

    // Ngắn gọn, dễ nhớ
    { emoji: '🎉', title: 'Chúc mừng 8/3!', body: 'Wishing you a day as bright and beautiful as you are! 💕' },
    { emoji: '🥂', title: 'Nâng ly mừng bạn!', body: 'Chúc bạn một ngày 8/3 ngập tràn niềm vui và tình yêu!' },
    { emoji: '🎊', title: 'Tiệc mừng hôm nay!', body: "Happy Women's Day! You deserve all the love in the world 🌍" },
    { emoji: '💌', title: 'Thư tình từ mèo!', body: 'Mèo nhỏ gửi đến bạn: trái tim đầy yêu thương và lời chúc ngọt ngào nhất!' },
    { emoji: '🧁', title: 'Ngọt lịm như cupcake!', body: 'Chúc bạn cuộc sống luôn đầy ắp những điều ngọt ngào nhất.' },

    // Lời chúc từ thiên nhiên
    { emoji: '🌻', title: 'Hướng về phía mặt trời!', body: 'Như hoa hướng dương, chúc bạn luôn hướng về ánh sáng và yêu đời.' },
    { emoji: '🌊', title: 'Sâu rộng như biển cả!', body: 'Tâm hồn bạn rộng lớn và bao dung như đại dương mênh mông.' },
    { emoji: '🏔️', title: 'Vững chắc như núi!', body: 'Bạn là ngọn núi vững vàng cho tất cả những ai cần tựa vào.' },
    { emoji: '🌅', title: 'Bình minh mới!', body: 'Mỗi buổi sáng là một cơ hội mới — và bạn xứng đáng với điều tốt nhất.' },
    { emoji: '🍃', title: 'Nhẹ nhàng & Tinh tế!', body: 'Sự dịu dàng của bạn chạm đến trái tim mọi người mà không cần lời nói.' },

    // Vui tươi
    { emoji: '🦄', title: 'Kỳ lân diệu kỳ!', body: 'Bạn không phải người thường — bạn là kỳ lân đặc biệt nhất vũ trụ này! 🦄' },
    { emoji: '🐝', title: 'Ong chăm chỉ!', body: 'Cần cù, dịu dàng và luôn tạo ra điều ngọt ngào — đó chính là bạn!' },
    { emoji: '🎆', title: 'Pháo hoa rực rỡ!', body: 'Cuộc sống bên bạn luôn rực rỡ như pháo hoa đêm giao thừa!' },
    { emoji: '🐠', title: 'Sắc màu rực rỡ!', body: 'Bạn mang màu sắc và niềm vui đến cho cuộc sống mọi người.' },
    { emoji: '🎈', title: 'Bay lên thật cao!', body: 'Như quả bóng bay, chúc bạn vươn tới những ước mơ xa nhất!' },
];

let recentIndexes = [];

/** Get a random message that wasn't shown recently */
export function getRandomMessage() {
    const total = WIN_MESSAGES.length;
    // Avoid last 10 shown
    const avoidSet = new Set(recentIndexes.slice(-10));

    let idx;
    do {
        idx = Math.floor(Math.random() * total);
    } while (avoidSet.has(idx) && avoidSet.size < total);

    recentIndexes.push(idx);
    if (recentIndexes.length > 20) recentIndexes = recentIndexes.slice(-20);

    return WIN_MESSAGES[idx];
}
