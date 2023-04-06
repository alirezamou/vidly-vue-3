<template>
    <tbody>
        <template v-for="(item, idx) in paginatedItems" :key="idx">
            <tr>
                <td>{{ item.title }}</td>
                <td>{{ item.genre.name }}</td>
                <td>{{ item.numberInStock }}</td>
                <td>{{ item.dailyRentalRate }}</td>
            </tr>
        </template>
    </tbody>
</template>

<script>
export default {
    name: "Paginated",
    props: {
        items: {
            type: Array,
            required: true,
        },
        per_page: {
            type: Number,
            default: 5,
            required: false,
        },
        current_page: {
            type: Number,
            default: 0,
            required: true,
        }
    },
    computed: {
        totalPage() {
            return Math.ceil(this.items.length / per_page);
        },
        paginatedItems() {
            const indexStart = this.per_page * this.current_page;
            const indexEnd = this.per_page * (this.current_page + 1);

            return this.items.slice(indexStart, indexEnd);
        }
    }
}
</script>