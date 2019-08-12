<template>
    <div class="switch-group">
        <div v-if="showLable" class="label">{{ label }}</div>
        <div class="switch-wrapper" @click="handleChange" :class="{'active': value}">
            <div class="switch-ball"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'switchGroup',
    data: function() {
        return {
            
        }
    },
    props: {
        value:{
            type: Boolean,
            default () {
             return true
            }
        },
        showLable: {
            type: Boolean,
            default () {
             return true
            }
        },
        labelarr:{
            type: Array,
            default () {
             return ["有","无"]
            }
        }
    },
    methods: {
        handleChange: function() {
            var lock = false;

            return function() {
                if (lock) return;

                lock = true;
                setTimeout(() => {
                    lock = false;
                }, 350);
                this.$emit('input', !this.value);
            }
        }()
    },
    computed: {
        'label': function() {
            return this.value ? this.labelarr[0] : this.labelarr[1];
        }
    }
}
</script>
<style scoped>
.switch-group{
    overflow: hidden;
}

.label{
    display: inline;
    vertical-align: middle;
    font-size: 0.3733rem;
    color: #666666;
}

.switch-wrapper{
    display: inline-block;
    position: relative;
    width:1.1081rem;
    height: 0.6757rem;
    background: #eee;
    /* background: #FAA200; */
    border-radius:2.2162rem;
    vertical-align: middle;
    transition: background-color .3s;
}

.switch-ball{
    position: absolute;
    top: 0.0541rem;
    left: 0.027rem;
    height: 0.5946rem;
    width: 0.5946rem;
    border-radius: 50%;
    background: #FFFFFF;
    box-shadow: 0 0 0.0541rem 0 rgba(0,0,0,0.20), 0 0.0541rem 0.3243rem 0 rgba(0,0,0,0.08), -0.027rem 0.0541rem 0.0541rem 0 rgba(0,0,0,0.10);
    transition: transform .3s;
}

.switch-wrapper.active{
    background: #4F60FF;
}

.switch-wrapper.active .switch-ball{
    transform: translate3d(0.4595rem, 0, 0);
}   
</style>