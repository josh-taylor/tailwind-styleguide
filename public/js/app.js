Vue.component('tailwind-styleguide', {
    template: `<div>
    <div class="max-w-xl mx-auto px-6">
        <h2 class="font-hairline text-2xl pb-2 mb-3 text-grey border-b-2 border-grey-lighter">Colors</h2>
        <tailwind-colors :colors="colors" class="mb-16"></tailwind-colors>
    </div>
    
    <div class="max-w-xl mx-auto px-6">
        <h2 class="font-hairline text-2xl pb-2 mb-3 text-grey border-b-2 border-grey-lighter">Screen Sizes</h2>
    </div>
    <div class="px-6">
        <tailwind-screens :sizes="screenSizes" class="mb-16"></tailwind-screens>
    </div>
    
    <div class="max-w-xl mx-auto px-6">
        <h2 class="font-hairline text-2xl pb-2 mb-3 text-grey border-b-2 border-grey-lighter">Enabled Modules</h2>
        <tailwind-modules :modules="enabledModules" class="mb-16"></tailwind-modules>
    </div>
</div>`,

    data() {
        return {
            colors: window.viewData.colors,
            screenSizes: window.viewData.screenSizes,
            enabledModules: window.viewData.enabledModules,
        }
    },
});

Vue.component('tailwind-colors', {
    template: `<div>
    <div class="flex flex-wrap -m-2">
        <tailwind-color class="w-1/6 p-2" v-for="(color, name) in colors" :key="name" :color="color" :name="name"/>
    </div>
</div>`,

    props: ['colors'],
});

Vue.component('tailwind-color', {
    template: `<div>
    <div class="w-full h-auto rounded-lg mb-1" :style="{ backgroundColor: color }" style="padding-top: 100%;"/>
    <div class="text-xs" v-text="name"/>
</div>`,

    props: ['color', 'name'],
});

Vue.component('tailwind-screens', {
    template: `<div>
    <tailwind-screen-size class="mb-3" v-for="(screen, index) in sortedSizes" :key="index" :screen="screen"></tailwind-screen-size>
</div>`,

    props: ['sizes'],

    computed: {
        sortedSizes() {
            return this.sizes.sort((a, b) => parseInt(a.size) - parseInt(b.size));
        },
    },
});

Vue.component('tailwind-screen-size', {
    template: `<div class="flex justify-center w-full bg-grey-lighter">
    <div class="flex justify-center items-center bg-grey p-2 max-w-full font-semibold" :style="{ width: screen.size }">
        <span class="opacity-50 mr-2">{{ screen.label }}:</span>
        <span>{{ screen.size }}</span>
    </div>
</div>`,

    props: ['screen'],
});

Vue.component('tailwind-modules', {
    template: `<div>
    <tailwind-module v-for="(module, index) in modules" :module="module" :key="index"></tailwind-module>
</div>`,

    props: ['modules'],
});

Vue.component('tailwind-module', {
    template: `<div class="border-b border-grey-lighter py-2">
    <span class="font-semibold">{{ module.name }}</span>: {{ joinedVariants }}
</div>`,

    props: ['module'],

    computed: {
        joinedVariants() {
            return this.module.variants.join(', ');
        },
    },
});

var app = new Vue({
    el: '#app',
});
