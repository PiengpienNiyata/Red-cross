<template>
    <div class="modal fade modal-bookmark" id="createtag" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Create Tag</h4>
                    <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="form-bookmark needs-validation" novalidate>
                        <div class="row">
                            <div class="mb-3 mt-0 col-md-12">
                                <label>Tag Name</label>
                                <input class="form-control" type="text" required autocomplete="off">
                            </div>
                            <div class="mt-0 col-md-12">
                                <label>Tag color</label>
                                <input class="form-color d-block" type="color" value="#563d7c">
                            </div>
                        </div>
                        <button class="btn btn-secondary me-1" type="button">Save</button>
                        <button class="btn btn-primary" type="button" data-bs-dismiss="modal">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>