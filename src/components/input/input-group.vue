<template>
  <div class="input-group">
    <label>{{ label }}</label>
    <div class="input-container">
      <input type="text" :class="{'dirty': selfDirty}" v-resetInput :value="value" @input="handleInput" :placeholder="placeholder"
        @focus="onFocus" @blur="onBlur">
      <div class="ps-container" v-show="selfDirty && !isFocus">
        <p class="ps" v-if="value && type && !validate[type](value)">*{{validateWord}}格式有误</p>
        <!-- <p class="ps" v-else-if="value && type == 'idcard' && !validate.idcard(value)">*身份证号格式有误</p>
        <p class="ps" v-else-if="value && type == 'name' && !validate.name(value)">*姓名格式有误</p> -->
      </div>
    </div>
  </div>
</template>
<script>
    import {
        isAndroid
    } from "~helpers/env.js";
    import {
        validate
    } from "~helpers/validate.js";
    export default {
        data: function() {
            return {
                currentValue: this.value,
                selfDirty: false,
                isFocus: false,
                validate,
            }
        },
        props: ['value', 'label', 'placeholder', 'type', 'dirty'],
        methods: {
            handleInput(evt) {
                var value = event.target.value;
                this.$emit('input', value);
            },
            onFocus(evt) {
                if (isAndroid) {
                    setTimeout(() => {
                        evt.target.scrollIntoViewIfNeeded();
                    }, 1000);
                }

                this.isFocus = true;
            },
            onBlur() {
                this.selfDirty = true;
                this.isFocus = false;
                this.$emit('blur');
            },
        },
        computed: {
            validateWord() {
                let word;
                switch (this.type) {
                    case 'name':
                        word = '姓名';
                        break;
                    case 'idcard':
                        word = '身份证号';
                        break;
                    case 'phone':
                        word = '手机号';
                        break;
                    default:
                        word = ''
                        break;
                }
                return word
            }
        },
        watch: {
            'dirty': function(value) {
                if (value) {
                    this.selfDirty = true;
                }
            },
        }
    }
</script>
<style scoped>
    .input-group {
        position: relative;
        background-color: #fff;
        padding: .32rem 0 .266667rem;
        border-bottom: 1px solid #eee;
        clear: both;
        overflow: hidden;
    }
    
    .input-group:last-child {
        border-bottom: none;
    }
    
    input {
        float: left;
        border: none;
        font-size: .373333rem;
        color: #333;
        outline: none;
        line-height: 22px;
        -webkit-user-select: auto;
        width: 6.933333rem;
    }
    
    label {
        margin-top: .026667rem;
        float: left;
        font-size: .373333rem;
        color: #333333;
        margin-right: .266667rem;
        width: 1.866667rem;
        min-width: 60px;
    }
    
    .input-container {
        position: relative;
        float: left;
        height: 100%;
    }
    
    .ps-container {
        position: absolute;
        font-size: .32rem;
        color: #FF0000;
        bottom: -.266667rem;
        /* transform: scale(.9); */
    }
    
    input.dirty::-webkit-input-placeholder {
        color: #ff0000;
    }
    
    input::-webkit-input-placeholder {
        color: #858585;
    }
</style>