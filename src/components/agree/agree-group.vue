<template>
    <div class="agree-group">
        <input type="checkbox" :checked="value" :value="currentValue" @click="handleInput" />
        <label>我已阅读
          <span  @click="toXuzhi" >《投保须知》</span> 和 <span @click="toProvision">《保险条款》</span>
        </label>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                currentValue: this.value,
            };
        },
        props: ["value", "type"],
        methods: {
            /**
             * 跳转条款链接
             */
            toProvision() {
                // this.$trackEvent('insure', 'terms')
                this.$router.push('/sub')
                    // if (this.type == 'old') {
                    //     this.$switchTo('/provisionkeb')
                    // } else {
                    //     this.$switchTo('/provisionseb')
                    // }
            },
            /**
             * 跳转投保须知
             */
            toXuzhi() {
                // this.$trackEvent('insure', 'notice')
                this.$switchTo('/xuzhi')
            },
            handleInput(evt) {
                setTimeout(() => {
                    var value = evt.target.checked;
                    console.log(value);
                    this.$emit("input", value);
                });
            },
        }
    };
</script>
<style scoped>
    .agree-group {
        background-color: #fff;
        padding: 0.32rem 0.4rem;
        font-size: 0.373333rem;
    }
    
    label a {
        color: #74adff;
        text-decoration: none;
    }
    
    label span {
        color: #68a5fe;
    }
    
    input {
        position: relative;
        top: -0.026667rem;
        width: 0.4rem;
        height: 0.4rem;
        vertical-align: middle;
        border: none;
        outline: none;
    }
    
    input::before {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: url("../../assets/image/checkbox-off.png");
        background-size: auto 100%;
        width: 2.666667rem;
        background-repeat: no-repeat;
    }
    
    input::after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: url("../../assets/image/checkbox-on.png");
        background-size: 100%;
        opacity: 0;
    }
    
    input:checked::after {
        opacity: 1;
    }
</style>