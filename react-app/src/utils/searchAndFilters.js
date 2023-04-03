export default function filterResults(list,search,query){

    let filteredList = list

    if(search.length){
        filteredList = broadSearch(filteredList,search)
    }
    if(query.city.length){
        filteredList = queryCity(filteredList,query.city)
    }
    if(query.state.length){
        filteredList = queryState(filteredList,query.state)
    }
    if(query.categories.length){
        filteredList = queryCategories(filteredList,query.categories)
    }
    if(query.price.length){
        filteredList = queryPrice(filteredList,query.price)
    }
    if(query.features.length){
        filteredList = queryFeatures(filteredList,query.features)
    }
    return filteredList
}


function queryCity(list,query){
    let filteredList = []
    let cities = query.split(',')
    for(let city of cities){
        filteredList = [...filteredList,...list.filter(el=>el.city == city)]
    }
    return filteredList
}

function queryState(list,query){
    return list.filter(el => new RegExp(query, 'gi').test(el.state))
}
function queryCategories(list,query){
    // let filteredList = []
    // let queries = query.split(',')
    // for(let cat of queries){
    //     filteredList = [...filteredList,list.filter(el=> scanCategories(cat,el.categories))]
    // }
    // return filteredList
    let filteredList = list
    let queries = query.split(',')
    for(let cat of queries){
        filteredList = filteredList.filter(el=> scanCategories(cat,el.categories))
    }
    return filteredList
}
function queryPrice(list,query){
    let filteredList = []
    let prices = query.split(',')
    for(let price of prices){
        filteredList = [...filteredList,...list.filter(el=>el.price == Number(price))]
    }
    return filteredList
}

function queryFeatures(list,query){
    if(!query) return list
    let features = query.split(',')
    let filteredList = list
    for(let feat of features){
        filteredList = filteredList.filter(el=> new RegExp(feat, 'gi').test(el.features))
    }
    return filteredList
}

function broadSearch(list,searchTerm){
    let filteredList = []
    for(let biz of list){
        if (new RegExp(searchTerm, 'gi').test(biz.name)){
            filteredList.push(biz)
            continue
        }
        if (new RegExp(searchTerm, 'gi').test(biz.city)){
            filteredList.push(biz)
            continue
        }
        if (new RegExp(searchTerm, 'gi').test(biz.address)){
            filteredList.push(biz)
            continue
        }
        if(biz.categories && scanCategories(searchTerm,biz.categories)){
            filteredList.push(biz)
        }
    }

    return filteredList
}

function scanCategories(searchTerm,categoriesList){
    for(let cat of categoriesList){
        if(cat.categoryName && cat.categoryName.toLowerCase()==searchTerm.toLowerCase()) return true
    }
    return false
}

export function isFiltered(QuObj){
    if(QuObj.search.length > 1 ||
        QuObj.query.city.length ||
        QuObj.query.state.length ||
        QuObj.query.price.length ||
        QuObj.query.categories.length ||
        QuObj.query.features.length) return true
    return false
}
