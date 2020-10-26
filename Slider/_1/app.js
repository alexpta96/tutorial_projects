class Slider {
    constructor() {
        this.init();
    }
    init() {
        this.slider = document.querySelector('.slider');
        this.btns = document.querySelectorAll('.btn');
        this.imgs = this.slider.querySelectorAll('.img');
        this.options = document.querySelectorAll('.option');        
        this.index = 1;
        this.size = this.imgs[this.index].clientWidth;
        this.activeOption = this.options[this.index - 1];
        this.backgrounds = document.querySelectorAll('.container .bg img');
        this.showBackground = this.backgrounds[this.index -1];
        
        this.btns.forEach(btn => {btn.addEventListener('click', this.checkBtn.bind(this))});
        this.options.forEach(option => {option.addEventListener('click', this.checkOption.bind(this))});
        this.slider.style.transform = `translateX(-${this.index * this.size}px)`;
        this.showBackground.classList.add('show');
        this.activeOption.classList.add('active');

    }
    update() {
        this.slider.style.transition = '0.3s transform ease-in-out';
        this.slider.style.transform = `translateX(-${this.index * this.size}px)`;
        if(this.activeOption) {
        this.activeOption.classList.remove('active');
        }       
        if(this.showBackground) {
        this.showBackground.classList.remove('show');
        }       
        this.slider.addEventListener('transitionend', () => {
            if(this.index <= 0) {
                this.index = this.imgs.length - 2;
                this.slider.style.transition = 'none';
                this.slider.style.transform = `translateX(-${this.index*this.size}px)`;
            }
            if(this.index >= this.imgs.length - 1) {
                this.index = 1;
                this.slider.style.transition = 'none';
                this.slider.style.transform = `translateX(-${this.index*this.size}px)`;
            }
            this.activeOption = this.options[this.index-1]; 
            this.showBackground = this.backgrounds[this.index-1]; 
            this.activeOption.classList.add('active');
            this.showBackground.classList.add('show');
        });
    }
    checkBtn() {
        let target = event.target.closest('.btn');
        if(target.classList.contains('prev-btn')){
            this.index--;
        } else if(target.classList.contains('next-btn')) {
            this.index++;
        }
        this.update();
    }
    checkOption() {
        let option = event.target.dataset.option;
        this.index = ++option;
        this.update();
    }
}

let slider = new Slider();