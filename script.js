document.getElementById("Download").addEventListener("click", () => {
    window.location.href = "components/resume.pdf";
})

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        const offsetTop = target.offsetTop;

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});
document.getElementsByTagName("i")[0].addEventListener('click', function () {
    window.open("https://byte-blog-wine.vercel.app/", '_blank', 'noopener,noreferrer');
});
document.querySelectorAll('.WorkExp > .card').forEach(card => {
    card.addEventListener('click', function () {
        window.open("https://github.com/aakash0101x?tab=repositories", '_blank', 'noopener,noreferrer');
    });
});