<template>
    <div class="col-sm-12">
        <div class="card">
            <div class="profile-img-style">
                <div class="row">
                    <div class="col-sm-8">
                        <div class="d-flex"><img class="img-thumbnail rounded-circle me-3" src="@/assets/images/user/7.jpg"
                                alt="Generic placeholder image">
                            <div class="flex-grow-1 align-self-center">
                                <h5 class="mt-0 user-name">JOHAN DIO</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 align-self-center">
                        <div class="float-sm-end"><small>10 Hours ago</small></div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-lg-12 col-xl-4">
                        <div class="my-gallery" id="aniimated-thumbnials-3" itemscope>
                            <figure itemprop="associatedMedia" v-for="(src, index) in img" :key="index"
                                @click="() => showImg(index)"><img class="img-fluid rounded" :src="getImgUrl(src.image)"
                                    itemprop="thumbnail" alt="Image description">
                            </figure>
                        </div>
                        <vue-easy-lightbox :index="indexRef" :visible="visible" :imgs="imgs"
                            @hide="handleHide"></vue-easy-lightbox>
                        <div class="like-comment mt-4 like-comment-sm-mb">
                            <ul class="list-inline">
                                <li class="list-inline-item border-right pe-3">
                                    <label class="m-0"><a href="#"><i class="fa fa-heart"></i></a>  Like</label><span
                                        class="ms-2 counter">
                                        <number class="bold counter" ref="number1" :from="0" :to="2659" :duration="5"
                                            :delay="0" easing="Power1.easeOut" />
                                    </span>
                                </li>
                                <li class="list-inline-item ms-2">
                                    <label class="m-0"><a href="#"><i class="fa fa-comment"></i></a>  Comment</label><span
                                        class="ms-2 counter">
                                        <number class="bold counter" ref="number1" :from="0" :to="569" :duration="5"
                                            :delay="0" easing="Power1.easeOut" />
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <p>Dressing is a way of life. My customers are successful working women. I want people to be afraid
                            of the women I dress. Age is something only in your head or a stereotype. Age means nothing when
                            you are passionate about something. There has to be a balance between your mental satisfaction
                            and the financial needs of your company.Success isn't about the end result, it's about what you
                            learn along the way. Confidence. If you have it, you can make anything look good. Grunge is a
                            hippied romantic version of punk. I'm an accomplice to helping women get what they want. Clothes
                            can transform your mood and confidence. I think it's an old fashioned notion that fashion needs
                            to be exclusive to be fashionable.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"

let visible = ref<boolean>(false)
let indexRef = ref<number>(0)
const imgs = ref([{ src: require('@/assets/images/blog/img.png') },])
const img = ref([{ image: 'blog/img.png' },])

function showImg(index: number) {
    indexRef.value = index
    visible.value = true
}
function handleHide() {
    visible.value = false
}

function getImgUrl(path: string) {
    return require('@/assets/images/' + path);
}
</script>