package com.example.flo

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.flo.databinding.ItemAlbumBinding

class AlbumRVAdapter(private val albumlist : ArrayList<Album>)
    : RecyclerView.Adapter<AlbumRVAdapter>() {

    // 뷰홀더를 생성해줘야 할 때 호출됨 => 아이템 뷰 객체를 만들어서 뷰홀더에 던져줌
    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): AlbumRVAdapter {
        val binding: ItemAlbumBinding =
            ItemAlbumBinding.inflate(LayoutInflater.from(viewGroup.context),viewGroup,false)

        return RecyclerView.ViewHolder(binding)
    }


    override fun onBindViewHolder(holder: AlbumRVAdapter, position: Int) {
        TODO("Not yet implemented")
    }

    override fun getItemCount(): Int {
        TODO("Not yet implemented")
    }

    // 뷰홀더 : 아이템을 담는 그릇
    inner class viewHolder(val binding: ItemAlbumBinding): RecyclerView.ViewHolder(binding.root){


    }

}