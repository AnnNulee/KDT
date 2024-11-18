<template>
<div>
    <div class="modal" tabindex="-1" :id="modalIdprops">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title"></h5>
                <slot name="title"></slot>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <slot name="body"></slot>
        </div>
        <div class="modal-footer">
            <slot name="footer"></slot>
        </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    props : {
        modalIdprops : {
            type : String,
            default : 'userModal',
        },

    },
    data(){
        return{
            sampleData:''
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{}
}

</script>